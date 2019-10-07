import React,{Component} from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      status:false,
      imageList:['image0','image1','image2','image3','image4','image5','image6','image7'],
      order:[],
      viewLargest: false
    }
  }
  componentDidMount(){
    const local = JSON.parse(localStorage.getItem('order'));
    if(local !== null){
       this.setState({imageList:local})
    }
  }
  onClickAdd = (e)=>{
    const currentValue = JSON.parse(localStorage.getItem(`${e.target.id}`)) || 0 ;
    const currentImage = e.target.id;
    //add highlight class if clicked
    e.target.classList.add('imageSelection')
    this.addToLocal(currentImage, currentValue);
    this.addOrder(currentImage);
    this.setState({status:true})
  }
  addOrder = (currentImage)=>{
    const oldOrder = this.state.order; 
    let newOrder = [];
    //check to see if image already clicked 
    if(!oldOrder.includes(currentImage)){
    newOrder.push(currentImage);
    newOrder = [ ...oldOrder, ...newOrder]
    this.setState({order:newOrder},()=>{
    this.reOrderList(newOrder);
    })
  } 
  }
  reOrderList = (newOrder) =>{ 
      let imageList = this.state.imageList;
      //filter orginal list to remove new order items 
      imageList = imageList.filter((image)=>{
      return !newOrder.includes(image)
      })
      let newImageList = [ ...this.state.order, ...imageList];
      /* this.setState({imageList:newImageList})  
      uncommit above if you want instant feedback for order selection, leave commited if you want order change to be on reload only
      */
      localStorage.setItem('order', JSON.stringify(newImageList))
  }
  addToLocal = (currentImage, currentValue) =>{
    //increment photo click counts 
    localStorage.setItem(`${currentImage}`, JSON.stringify(currentValue + 1))
  }
  onClickFilter = () =>{
    //show largest amount of clicked images 
    this.setState({viewLargest:this.state.viewLargest?false:true})
  }
  render(){
   const { imageList } = this.state;
    return(
      <div id='app'>
        <div id='top'>
          <h3>Showing: {this.state.viewLargest?'Most clicked images':'User order'}</h3>
          <button type='button' onClick={this.onClickFilter}>{this.state.viewLargest?'View by user order':'View by largest'}</button>
        </div>
        <div id='imageContainer'>
          {
            imageList.map((image,i)=>{
            return <div 
                key={i} 
                style={{order:this.state.viewLargest? JSON.parse(-Math.abs(localStorage.getItem(image))) : 0}}
                >
                  <img id={image} 
                    onClick={this.onClickAdd} 
                    alt='placeholder' 
                    className='image' 
                    src={`https://via.placeholder.com/100?text=${image}`} />
                    <p>Clicks: {JSON.parse(localStorage.getItem(image)) || 0}</p>
             </div>
            })
          }
        </div>
      </div>
    )
  }
}
export default App;
