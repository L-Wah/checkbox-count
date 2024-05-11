interface componentsType {
  id: string;
  state: boolean;
}

export default {
  components: [] as componentsType[],
  activeCount: 0,

  increment(id: componentsType["id"]) {
    this.activeCount++;
    const index = this.components.findIndex((item: componentsType) => {
      return id === item.id;
    });
    if (index !== -1) {
      this.components[index].state = true;
    }
    this.update();
  },

  decrement(id: componentsType["id"]) {
    this.activeCount--;
    const index = this.components.findIndex((item: componentsType) => {
      return id === item.id;
    });
    if (index !== -1) {
      this.components[index].state = false;
    }
    this.update();
  },

  update() {
    if (
      this.components.every((item: componentsType) => {
        return !item.state;
      })
    ) {
      (document.querySelector("body") as HTMLElement).style.overflow = "visible";
    } else {
      (document.querySelector("body") as HTMLElement).style.overflow = "hidden";
    }
  },
};
