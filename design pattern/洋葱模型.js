class TaskPro {
  constructor(list) {
    this.tasks = list || [];
  }
  addTask(fn) {
    this.tasks.push(fn);
  }
  async run() {
    const next = async () => {
      await fn();
    };
    const fn = async () => {
      if (this.tasks.length) {
        await this.tasks.shift()(next);
        await fn();
      }
    };
    await fn();
  }
}

// 洋葱模型
const app = new TaskPro();
app.addTask(async (next) => {
  console.log(1);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  next();
  console.log(4);
});

app.addTask((next) => {
  console.log(2);
  // 不执行next，仍然会执行下一个任务
});
app.addTask((next) => {
  console.log(3);
});

app.run();
