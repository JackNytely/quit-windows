import { DbConnection } from "@/lib/module_bindings";
import {
  getIpHashSecret,
  getServerSpacetimeDatabase,
  getServerSpacetimeUri,
} from "@/lib/env";
import { hashIp } from "@/lib/ip";

function requireConfig(): { uri: string; database: string; secret: string } {
  const uri = getServerSpacetimeUri();
  const database = getServerSpacetimeDatabase();
  const secret = getIpHashSecret();
  if (!uri || !database || !secret) {
    throw new Error("missing_spacetime_config");
  }
  return { uri, database, secret };
}

export function withSpacetimeConnection<T>(
  fn: (conn: DbConnection) => Promise<T>,
): Promise<T> {
  const { uri, database } = requireConfig();
  return new Promise((resolve, reject) => {
    const builder = DbConnection.builder()
      .withUri(uri)
      .withDatabaseName(database)
      .onConnectError((_ctx, err) => {
        reject(err);
      })
      .onConnect((connection) => {
        fn(connection)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            try {
              connection.disconnect();
            } catch {
              /* ignore */
            }
          });
      });
    builder.build();
  });
}

export async function registerSwitchOnServer(payload: {
  deviceId: string;
  distroKey: string;
  clientIp: string;
}): Promise<void> {
  const { secret } = requireConfig();
  const ipHash = hashIp(payload.clientIp, secret);
  await withSpacetimeConnection(async (conn) => {
    await conn.reducers.registerSwitch({
      deviceId: payload.deviceId,
      distroKey: payload.distroKey,
      ipHash,
    });
  });
}

export async function deviceIsRegistered(deviceId: string): Promise<boolean> {
  return withSpacetimeConnection(async (conn) => {
    return new Promise((resolve, reject) => {
      conn
        .subscriptionBuilder()
        .onApplied(() => {
          try {
            const table = conn.db.switch_event;
            for (const row of table.iter()) {
              if (row.deviceId === deviceId) {
                resolve(true);
                return;
              }
            }
            resolve(false);
          } catch (e) {
            reject(e);
          }
        })
        .subscribe("SELECT * FROM switch_event");
    });
  });
}
