"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DISTRO_OPTIONS, type DistroKey } from "@/lib/distros";
import { getOrCreateDeviceId, isDesktopLinuxUserAgent } from "@/lib/platform";
import { CheckCircle2, Loader2 } from "lucide-react";

export function LinuxSwitchCard() {
  const [isLinux, setIsLinux] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [registered, setRegistered] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const [distro, setDistro] = useState<DistroKey>("ubuntu");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLinux(isDesktopLinuxUserAgent(navigator.userAgent));
    setDeviceId(getOrCreateDeviceId());
  }, []);

  const refreshStatus = useCallback(async () => {
    const id = getOrCreateDeviceId();
    if (!id) return;
    const res = await fetch(
      `/api/switch/status?deviceId=${encodeURIComponent(id)}`,
    );
    const data = (await res.json()) as { registered?: boolean; offline?: boolean };
    if (res.ok) {
      setRegistered(!!data.registered);
    } else {
      setRegistered(null);
    }
  }, []);

  useEffect(() => {
    if (!isLinux || !deviceId) return;
    void refreshStatus();
  }, [isLinux, deviceId, refreshStatus]);

  async function onSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const id = getOrCreateDeviceId();
      const res = await fetch("/api/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: id, distroKey: distro }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        if (res.status === 409) {
          setError(
            "This browser or network was already counted—duplicate prevented.",
          );
          setRegistered(true);
          return;
        }
        setError(data.error ?? "Could not record your switch.");
        return;
      }
      setRegistered(true);
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  if (!isLinux) {
    return null;
  }

  return (
    <Card className="border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold">
            ✓
          </span>
          You are on Linux
        </CardTitle>
        <CardDescription>
          Record a one-time “I switched” signal for the community stats (device
          ID in local storage + hashed IP on the server).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {registered ? (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <CheckCircle2 className="text-emerald-400 h-5 w-5" />
            You are counted—thanks for helping newcomers see momentum.
          </div>
        ) : (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className={cn(buttonVariants({ size: "lg" }), "font-semibold")}
            >
              I’ve switched from Windows
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm your distro</DialogTitle>
                <DialogDescription>
                  We cannot read /etc/os-release from the browser—pick the
                  closest match.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <Label htmlFor="distro">Linux OS</Label>
                <Select
                  value={distro}
                  onValueChange={(v) => setDistro(v as DistroKey)}
                >
                  <SelectTrigger id="distro">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTRO_OPTIONS.map((d) => (
                      <SelectItem key={d.key} value={d.key}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {error ? (
                <p className="text-destructive text-sm">{error}</p>
              ) : null}
              <DialogFooter>
                <Button
                  onClick={() => void onSubmit()}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
