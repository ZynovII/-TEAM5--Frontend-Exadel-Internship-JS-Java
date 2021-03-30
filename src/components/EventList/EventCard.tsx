import React from 'react'
import {
    DocumentCard,
    DocumentCardTitle,
  } from '@fluentui/react/lib/components/DocumentCard';
  import { ImageFit } from '@fluentui/react/lib/components/Image';
  import {Image, imgProperties, Text} from '@fluentui/react'
  
const cardImage = require("./../../assets/img/card_img.jpg");


 const styles = {
     styleCard: {
         root:{
            paddingBottom: '10px',
            width: '30%',
            marginBottom: '20px'
         }
     },
     mainTytle :{
         root:{
            height: '35px',
            lineHeight: '35px',

         }
     },
     title:{
         root:{
             height: '25px',
             lineHeight: '25px',
             paddingBottom: 0,
            paddingTop:0           }
     },
     text: {
        paddingLeft: '20px',
        marginBottom: '10px'

     }
    }
    export interface ICardItemInfo{
        title: string;
        date: string;
        location: string
    }
 
    export interface ICardItemProps {
        cardItem: ICardItemInfo;
    }
 export const CardItem: React.FC<ICardItemProps> = (props) => (
    <DocumentCard styles={styles.styleCard}>
        <Image  height={150} imageFit={ImageFit.cover} src={cardImage.default}/>
        <DocumentCardTitle styles={styles.mainTytle} title={props.cardItem.location}/>
        <DocumentCardTitle title={props.cardItem.date} showAsSecondaryTitle styles={styles.title}/>
        <Text style={styles.text}>{props.cardItem.location}</Text>
    </DocumentCard>
              
  );