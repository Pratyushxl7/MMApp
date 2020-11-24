import * as React from 'react';
import EachRestaurant from './each-restaurant';
import axios from 'axios';


export interface Props {};

export interface State {
    returnedRestaurants: any,
    formattedData: any
  };

  

export default class AllRestaurants extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
    
        this.state = {
            returnedRestaurants: [],
            formattedData: []
        };
      }
    
    
    componentWillMount(){

        axios.get(`https://run.mocky.io/v3/b0f3e975-b815-4e88-8a6a-84af59fe32eb`).then(response => {
            // console.log(response.data[0]['Kushi Tsuru']);
            this.setState({returnedRestaurants : response.data});


            let fData=this.state.returnedRestaurants.map(each => {return [each['Kushi Tsuru'], each['Mon-Sun 11:30 am - 9 pm']]});
            // console.log(this.state.returnedRestaurants);
            // console.log(fData);
            let i=0;
            let days=["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            let schedules=[]
            fData.forEach(e => {
                
                let x=e[1].split('/')
                // console.log(i)
                let res=[];
                for (let each of x)
                {
                    for (let a of each.split(','))
                    {
                        a=a.trim();
                        res.push(a)                        
                    }
                }
                schedules.push({name: e[0], timings: res})
                i++;
        });


        // console.log(schedules)
        let refSchedules=[];


        schedules.forEach(e => {
            let eachSch=[];
            for (let each of e.timings)
            {
                if(each.length===7)
                {
                    eachSch.push({days: each, time: "def"})
                }
                else
                {
                    let timing = each.replace( /^\D+/g, '');
                    eachSch.push({days: each.slice(0,each.indexOf(timing)-1), time: each.slice(each.indexOf(timing))})
                }
                
            }
            
            //Filtering def
            for (let any of eachSch)
            {
                if (any.time==="def")
                {
                    eachSch[eachSch.indexOf(any)].time=eachSch[eachSch.indexOf(any)+1].time;
                }
            }
            refSchedules.push({name: e.name, timings: eachSch});
        })
        // console.log(refSchedules)
        // --------------
        this.setState({formattedData: refSchedules});

        console.log("-----------------")

        console.log(this.state.returnedRestaurants)

        });
    }
    
    beautify(temp1: string)
    {
        return temp1.slice(0, temp1.indexOf(' ')) + "--->"+ temp1.slice(temp1.indexOf(' ')+1)
    }


    
    render()
    {
         return(<div>
             {this.state.returnedRestaurants[0].name}
         </div>)
    }
    // // let rendered= this.state.returnedRestaurants.map(e => {return <EachRestaurant key={e.name} data={e} />})
    //     // return (<div>
    //         {/* {rendered} */}
    //         {/* </div>); */}
    
    
}