const jsonArray = [];

for (let i = 1; i <= 10; i++) {
  const obj = {
    sample_time: i,
    speed: `Speed ${i}`
  };

  jsonArray.push(obj);
}

console.log(JSON.stringify(jsonArray));
