class r {
  constructor(e, t) {
    this.host = e, this.factory = t, e.addController(this);
  }
  hostConnected() {
    this.service = this.factory(), this.unsubscribe = this.service.subscribe(() => this.host.requestUpdate()), this.service.start();
  }
  hostDisconnected() {
    this.unsubscribe?.(), this.service?.stop?.();
  }
  get state() {
    if (!this.service) throw new Error("ZagController.state accessed before connection");
    return this.service.state;
  }
  get send() {
    if (!this.service) throw new Error("ZagController.send accessed before connection");
    return this.service.send.bind(this.service);
  }
  setContext(e) {
    this.service?.setContext?.(e);
  }
}
export {
  r as ZagController
};
