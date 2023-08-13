import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: 'Kopi Bubuk',
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: 'Gula Pasir',
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: 'Air Mineral',
    quantity: 3,
    checked: false,
  },
];

function App() {
  const [items,setItems]=useState(groceryItems)


  function handleDeleteAll(){
    setItems([])
  }
  
  function handleAddItem(item){
    setItems([...items,item]);
  }

  function handleDeleteItem(id){
    setItems((items)=>items.filter((item)=>item.id !== id))
  }

  function handleToogleItem(id){
    setItems((items)=>items.map((item)=>(item.id === id ? {...item, checked: !item.checked}:item)));
  }

  return (
  <div className="app">
    <Header/>
    <Form onAddItem={handleAddItem}/>
    <GroceryList items={items} onDelete={handleDeleteItem} onChecked={handleToogleItem} onDeleteAll={handleDeleteAll} />
    <Footer items={items}/>
  </div>
  );
}

function Header(){
  return <h1>Catatan Belanjaku 📝</h1>

}

function Form({onAddItem}){
  const [name,setName]=useState('')
  const [quantity,setQuantity]=useState(1)

  const quantityNum=[...Array(20)]
  
  function handleSubmit(e){
    e.preventDefault()
    if (!name){
      return
    }

    
    const newItem={
      name:name,
      quantity:quantity,
      checked:false,
      id:Date.now()
    }

    onAddItem(newItem)

    // console.log(newItem)
    
    setName('')
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}  >
        {
          quantityNum.map(
            (_,i)=>(
              <option value={i+1} key={i+1}>{i+1}</option>
            )
          )
        }
      </select>
      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="nama barang..." />
      <button>Tambah</button>
    </form>
  )
}

function GroceryList({items,onDelete,onChecked,onDeleteAll}){
  return(
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
          <Item item={item}  key={item.id} onDelete={onDelete} onChecked={onChecked}/>
          ))}
        </ul>
      </div>
      <div className="actions">
        <button onClick={onDeleteAll}>Bersihkan Daftar</button>
      </div>
    </>
  )
}

function Item({item,onDelete,onChecked}) {
  return(
    <li>
      <input type="checkbox" checked={item.checked} onChange={()=>onChecked(item.id)}/>
      <span style={item.checked?{textDecoration:'line-through'}:{}} >{item.quantity} {item.name}</span>
      <button onClick={()=>onDelete(item.id)}>&times;</button>
    </li>
  )
  
}

function Footer({items}){
  const a=items.length
  const b=items.filter((item)=>item.checked).length
  const c=Math.round(100*b/a)
  return  <footer className="stats">Ada {a} barang di daftar belanjaan, {b} barang sudah dibeli {c>0?c:0}%</footer>
}


export default App
