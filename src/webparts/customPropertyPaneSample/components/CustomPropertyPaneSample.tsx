import * as React from 'react';
import styles from './CustomPropertyPaneSample.module.scss';
import { ICustomPropertyPaneSampleProps } from './ICustomPropertyPaneSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CustomPropertyPaneSample extends React.Component<ICustomPropertyPaneSampleProps, {}> {
  public render(): React.ReactElement<ICustomPropertyPaneSampleProps> {
    return (
      <div className={ styles.customPropertyPaneSample }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.listName)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
