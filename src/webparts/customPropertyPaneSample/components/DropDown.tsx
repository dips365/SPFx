import * as react from 'react';
import { Dropdown,IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";
import { Spinner,SpinnerLabelPosition } from "office-ui-fabric-react/lib/components/Spinner";
import { IListDropDownProps } from "./IListDropDownProps";
import { IListDropDownState } from "./iListDropDownState";


export default class ListDropDown extends React.Component<IListDropDownProps,IListDropDownState>{
    private selectedKey:React.ReactText;
    constructor (props:IListDropDownProps,state:IListDropDownState){
        super(props);
        this.selectedKey = props.selectedKey;
        this.state={
            loading:false,
            options:undefined,
            error:undefined,
        };
    }

    public componentDidMount():void{
        this.loadOptions();
    }

    public componentDidUpdate(prevProps:IListDropDownProps,prevState:IListDropDownState):void{
        if(this.props.disabled !== prevProps.disabled || this.props.selectedKey !== prevProps.selectedKey{
            this.loadOptions();
        }
    }

    private loadOptions():void {
        this.setState({
            loading:true,
            error:undefined,
            options:undefined
        });

        this.props.loadOptions().then((options:IDropdownOption[]):void=>{
            this.setState({
                loading:false,
                error:undefined,
                options:options
            });
        },(error:any):void=>{
            this.setState((prevState:IListDropDownState,props:IListDropDownProps):IListDropDownState=>{
                prevState.loading=false;
                prevState.error=error;
                return prevState;
            });
        });
    }

    public render():JSX.Element{
        const loading : JSX.Element = this.state.loading?
        <div>
            <Spinner label={'Loading Options...'}></Spinner>
        </div>:<div/>;

        const error : JSX.Element = this.state.error !== undefined?
        <div className={'ms-TextField-errorMessage ms-u-slideDownIn20'}>
            Error while loading items : {this.state.error}
        </div>:<div/>;

        return(
            <div>
                <Dropdown 
                label={this.props.lable}
                disabled={this.props.disabled || this.state.loading || this.state.error !== undefined}
                onChanged={this.props.onChanged.bind(this)}
                selectedKey = {this.selectedKey}
                options={this.state.options}
                />
                {loading}
                {error}
            </div>
        )
    }
}