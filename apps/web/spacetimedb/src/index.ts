import { schema, table, t } from 'spacetimedb/server';

const DISTRO_KEY_RE = /^[a-z0-9][a-z0-9_-]{0,62}$/;

const spacetimedb = schema({
  switch_event: table(
    { public: true, name: 'switch_event' },
    {
      device_id: t.string().primaryKey(),
      ip_hash: t.string().unique(),
      distro_key: t.string(),
      created_at: t.timestamp(),
    }
  ),
});

export default spacetimedb;

export const init = spacetimedb.init(() => {});

export const register_switch = spacetimedb.reducer(
  {
    device_id: t.string(),
    distro_key: t.string(),
    ip_hash: t.string(),
  },
  (ctx, { device_id, distro_key, ip_hash }) => {
    const dk = distro_key.trim().toLowerCase();
    if (!DISTRO_KEY_RE.test(dk)) {
      throw new Error('invalid_distro_key');
    }
    if (device_id.length < 8 || device_id.length > 128) {
      throw new Error('invalid_device_id');
    }
    if (ip_hash.length < 16 || ip_hash.length > 256) {
      throw new Error('invalid_ip_hash');
    }
    ctx.db.switch_event.insert({
      device_id,
      distro_key: dk,
      ip_hash,
      created_at: ctx.timestamp,
    });
  }
);
