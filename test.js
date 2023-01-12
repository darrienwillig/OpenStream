const test = [{
  slug: 'apple',
  name: 'Apple',
},{
  slug: 'apple',
  name: 'Apple',
},{
  slug: 'apple',
  name: 'Apple',
},{
  slug: 'peach',
  name: 'Peach',
},{
  slug: 'peach',
  name: 'Peach',
},{
  slug: 'peach',
  name: 'Peach',
}]

let arr = test.map((a) => {
  return a.slug
})

console.log(arr)