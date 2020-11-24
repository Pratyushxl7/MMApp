import * as React from 'react';


export interface Props { data: any};
export interface State {};

  export default class EachRestaurant extends React.Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render()
    {
        console.log(this.props.data)
    
        return(<div id="restaurantCard">
            {this.props.data.name}
        </div>);
    }

    

}