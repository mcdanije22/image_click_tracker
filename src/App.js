import React,{Component} from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      image0: 0,
      image1: 0,
      image2: 0,
      image3: 0,
      image4: 0,
      image5: 0,
      image6: 0,
      image7: 0,
      order:[],
      image0Index: 0,
      image1Index: 0,
      image2Index: 0,
      image3Index: 0,
      image4Index: 0,
      image5Index: 0,
      image6Index: 0,
      image7Index: 0,
      viewLargest: false
    }
  }
  componentDidMount(){
    const local = JSON.parse(localStorage.getItem('order'));
    if(local !== null){
      this.setState({order:local},()=>{
        this.setState({
          //adjust flexbox order of images 
          image0Index: local.indexOf('image0') +1 !== 0? local.indexOf('image0') +1 : 99,
          image1Index: local.indexOf('image1') +1 !== 0? local.indexOf('image1') +1 : 99,
          image2Index: local.indexOf('image2') +1 !== 0? local.indexOf('image2') +1 : 99,
          image3Index: local.indexOf('image3') +1 !== 0? local.indexOf('image3') +1 : 99,
          image4Index: local.indexOf('image4') +1 !== 0? local.indexOf('image4') +1 : 99,
          image5Index: local.indexOf('image5') +1 !== 0? local.indexOf('image5') +1 : 99,
          image6Index: local.indexOf('image6') +1 !== 0? local.indexOf('image6') +1 : 99,
          image7Index: local.indexOf('image7') +1 !== 0? local.indexOf('image7') +1 : 99,
        })
      })
    }
  }
  onClickAdd = (e)=>{
    const currentValue = this.state[e.target.id];
    const currentImage = e.target.id;
    this.setState({[e.target.id]: currentValue + 1})
      this.addToLocal(currentImage, currentValue);
      this.addOrder(currentImage);
  }
  addOrder = (currentImage)=>{
    const oldOrder = this.state.order;
    const image = currentImage;
    //check to see if image already in order array so it does not add to order twice 
     if(!oldOrder.includes(currentImage)){
      let newOrder = [...oldOrder, image];
      this.setState({order:newOrder})
        localStorage.setItem('order', JSON.stringify(newOrder))
    }
  }
  addToLocal = (currentImage, currentValue) =>{
    //increment photo click counts 
    const localValue = JSON.parse(localStorage.getItem(`${currentImage}`));
    if(localValue == null){
      localStorage.setItem(`${currentImage}`, JSON.stringify(currentValue + 1))
    }else{
      localStorage.setItem(`${currentImage}`, JSON.stringify(localValue + 1))
    }
  }
  onClickFilter = () =>{
    //show largest amount of clicked images 
    this.setState({viewLargest:this.state.viewLargest?false:true})
  }
  render(){
    return(
      <div id='app'>
      <div id='top'>
      <h3>Showing: {this.state.viewLargest?'Most clicked images':'User order'}</h3>
      <button type='button' onClick={this.onClickFilter}>View by largest</button>
      </div>
        <div id='imageContainer'>
          {/*get order based off amount of clicks. -math.abs to reverse order of images in flexbox */}
          <div style={{order:this.state.viewLargest? JSON.parse(-Math.abs(localStorage.getItem('image0'))) || this.state.image0 : this.state.image0Index}}><img id='image0' onClick={this.onClickAdd}  className='image' src='https://via.placeholder.com/100?text=image0'  /><p>Clicks: {JSON.parse(localStorage.getItem('image0')) || 0}</p></div>
          <div style={{order:this.state.viewLargest? JSON.parse(-Math.abs(localStorage.getItem('image1'))) || this.state.image1 : this.state.image1Index}}><img id='image1' onClick={this.onClickAdd}  className='image' src='https://via.placeholder.com/100?text=image1'  /><p>Clicks: {JSON.parse(localStorage.getItem('image1')) || 0}</p></div>
          <div style={{order:this.state.viewLargest? JSON.parse(-Math.abs(localStorage.getItem('image2'))) || this.state.image2  : this.state.image2Index}}><img id='image2' onClick={this.onClickAdd}  className='image' src='https://via.placeholder.com/100?text=image2'  /><p>Clicks: {JSON.parse(localStorage.getItem('image2')) || 0}</p></div>
          <div style={{order:this.state.viewLargest? JSON.parse(-Math.abs(localStorage.getItem('image3'))) || this.state.image3 : this.state.image3Index}}><img id='image3' onClick={this.onClickAdd}  className='image' src='https://via.placeholder.com/100?text=image3'   /><p>Clicks: {JSON.parse(localStorage.getItem('image3')) || 0}</p></div>
          <div style={{order:this.state.viewLargest? JSON.parse(-Math.abs(localStorage.getItem('image4'))) || this.state.image4  : this.state.image4Index}}><img id='image4' onClick={this.onClickAdd}  className='image' src='https://via.placeholder.com/100?text=image4'  /><p>Clicks: {JSON.parse(localStorage.getItem('image4')) || 0}</p></div>
          <div style={{order:this.state.viewLargest? JSON.parse(-Math.abs(localStorage.getItem('image5'))) || this.state.image5  : this.state.image5Index}}><img id='image5' onClick={this.onClickAdd}  className='image' src='https://via.placeholder.com/100?text=image5'  /><p>Clicks: {JSON.parse(localStorage.getItem('image5')) || 0}</p></div>
          <div style={{order:this.state.viewLargest? JSON.parse(-Math.abs(localStorage.getItem('image6'))) ||this.state.image6 : this.state.image6Index}}><img id='image6' onClick={this.onClickAdd}  className='image' src='https://via.placeholder.com/100?text=image6'   /><p>Clicks: {JSON.parse(localStorage.getItem('image6')) || 0}</p></div>
          <div style={{order:this.state.viewLargest? JSON.parse(-Math.abs(localStorage.getItem('image7'))) || this.state.image7  : this.state.image7Index}}><img id='image7' onClick={this.onClickAdd}  className='image' src='https://via.placeholder.com/100?text=image7'  /><p>Clicks: {JSON.parse(localStorage.getItem('image7')) || 0}</p></div>
        </div>
      </div>
    )
  }
}

export default App;
