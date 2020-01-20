import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneDynamicField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './StockInformationWebPart.module.scss';
import * as strings from 'StockInformationWebPartStrings';

export interface IStockInformationWebPartProps {
 name: string; 
 description: string; 
 Slider:string; 
 Toggle:string; 
 dropdowm:string; 
 checkbox:string; 
 URL:string; 
 textbox:string;
}

export default class StockInformationWebPart extends BaseClientSideWebPart<IStockInformationWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.stockInformation }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
              <p class="${ styles.description }">${escape(this.properties.Slider)}</p>
              <p class="${ styles.description }">${escape(this.properties.dropdowm)}</p>
              <p class="${ styles.description }">${escape(this.properties.Toggle)}</p>
              <p class="${ styles.description }">${escape(this.properties.checkbox)}</p>
              <p class="${ styles.description }">${escape(this.properties.name)}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected TextBoxValidationMethod(value:string):string{
    if(value.length < 10){
      return "Name should be at least 10 charcters!";
    }
    else{
      return "";
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Page -1 Name and Description"
          },
          groups: [
            {
              groupName: "Group One",
              groupFields: [
                PropertyPaneTextField('name', {
                  label: "Name",
                  multiline :false,
                  resizable:false,
                  onGetErrorMessage:this.TextBoxValidationMethod,
                  errorMessage:"This is error message",
                  deferredValidationTime:5000,
                  placeholder:"Please enter name",
                  description:"Please enter name"
                }),
                PropertyPaneTextField('description',{
                  label:"Description",
                  multiline:true,
                  resizable:true,
                  placeholder:"Please enter description",
                  description:"Please enter description",
                })
              ]
            }
          ]
        },
        {
          header:{
            description:"Page -2 Name and Description"
          },
          groups:[{
            groupName:"Group One",
            groupFields:[
              PropertyPaneSlider('Slider',{
                label:"Slider",
                min:0,
                max:10
              }),
              PropertyPaneToggle('Toggle',{
                label:"Toggle"
              })
            ]
          },{
            groupName:"Group Two",
            groupFields:[
              PropertyPaneDropdown('dropdown',{
                label:'Drop Down',
                options:[
                  {key:'Item1',text:'text1'},
                  {key:'Item2',text:'text2'},
                  {key:'Item3',text:'text3'}
                ]
              }),
              PropertyPaneCheckbox('checkbox',{
                text:'Yes/No'
              })
            ]
          }]
        },
        {
          header:{
            description:"Page 3 - URL and Link"
          },
          groups:[{
            groupName:"Group one",
            groupFields:[
              PropertyPaneLink('URL',{
                text:"Microsoft",
                href:"https://www.microsoft.com",
                target:"_blank"
              }),
              PropertyPaneLabel('label',{
                text:"Please enter designation",
                required:true
              }),
              PropertyPaneTextField('textbox',{})
            ]
          }]
        }
      ]
    };
  }
}


