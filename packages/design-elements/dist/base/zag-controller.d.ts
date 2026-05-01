import type { ReactiveController, ReactiveControllerHost } from 'lit';
interface ZagService<TState = unknown> {
    state: {
        value: TState;
        matches: (value: TState | TState[]) => boolean;
        context: any;
    };
    send: (event: any) => void;
    subscribe: (cb: (state: any) => void) => () => void;
    start: () => void;
    stop?: () => void;
    setContext?: (ctx: Record<string, unknown>) => void;
}
/**
 * Bridges a Zag.js machine service into a Lit element's reactive lifecycle.
 *
 * Usage:
 *   private machine = new ZagController(this, () => dialog.machine({ id: 'x' }));
 *   render() { const api = dialog.connect(this.machine.state, this.machine.send, normalizeProps); ... }
 */
export declare class ZagController<TService extends ZagService = ZagService> implements ReactiveController {
    private host;
    private factory;
    private service?;
    private unsubscribe?;
    constructor(host: ReactiveControllerHost, factory: () => TService);
    hostConnected(): void;
    hostDisconnected(): void;
    get state(): {
        value: unknown;
        matches: (value: unknown) => boolean;
        context: any;
    };
    get send(): (event: any) => void;
    setContext(ctx: Record<string, unknown>): void;
}
export {};
