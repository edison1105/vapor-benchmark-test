window.ITEM_COUNT = 10000; 

export function genHtml() {
  let items = ``;
  for (let i = 0; i < window.ITEM_COUNT; i++) {
    items += `<!--[--><div><div><h1>Hello World! ${i+1}</h1><input value="Hello World!"><!--[--><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><!--]--><!--[--><span>hi</span><!--]--><span></span></div></div><!--]-->`;
  }
  return `<!--[--><button>toggle</button><div>${items}</div><!--]-->`;
}

