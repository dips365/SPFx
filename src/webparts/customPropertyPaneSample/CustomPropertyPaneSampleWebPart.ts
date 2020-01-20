import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CustomPropertyPaneSampleWebPartStrings';
import CustomPropertyPaneSample from './components/CustomPropertyPaneSample';
import { ICustomPropertyPaneSampleProps } from './components/ICustomPropertyPaneSampleProps';

export interface ICustomPropertyPaneSampleWebPartProps {
  listName: string;
}

export default class CustomPropertyPaneSampleWebPart extends BaseClientSideWebPart<ICustomPropertyPaneSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICustomPropertyPaneSampleProps > = React.createElement(
      CustomPropertyPaneSample,
      {
        listName: this.properties.listName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.listFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
