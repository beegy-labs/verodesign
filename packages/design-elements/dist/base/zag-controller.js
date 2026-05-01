class ZagController {
  constructor(host, factory) {
    this.host = host;
    this.factory = factory;
    host.addController(this);
  }
  hostConnected() {
    this.service = this.factory();
    this.unsubscribe = this.service.subscribe(() => this.host.requestUpdate());
    this.service.start();
  }
  hostDisconnected() {
    this.unsubscribe?.();
    this.service?.stop?.();
  }
  get state() {
    if (!this.service) throw new Error("ZagController.state accessed before connection");
    return this.service.state;
  }
  get send() {
    if (!this.service) throw new Error("ZagController.send accessed before connection");
    return this.service.send.bind(this.service);
  }
  setContext(ctx) {
    this.service?.setContext?.(ctx);
  }
}
export {
  ZagController
};
//# sourceMappingURL=zag-controller.js.map
