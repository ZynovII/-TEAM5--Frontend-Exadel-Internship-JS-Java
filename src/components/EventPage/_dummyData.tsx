import IEventPage from '../../models/IEventPage'

const data: IEventPage = {
  id: 'veryAwesomeID',
  title: 'Internship JS & Java',
  date: '01.03.2021 - 15.04.2021, Belarus',
  description: 'Exadel will provide you with new knowledge and invaluable development experience.Exadel will provide you with new knowledge and invaluable development experience.Exadel will provide you with new knowledge and invaluable development experience.Exadel will provide you with new knowledge and invaluable development experience.You need to have basic knowledge about web- development.',
  photoURL: 'https://via.placeholder.com/520x410',
  // photoURL: 'https://placekitten.com/520/410',
  technology: [
    {
      key: 'JS', text: 'JS'
    },
    {
      key: 'Java', text: 'Java'
    },
    {
      key: 'Others', text: 'Others'
    },
  ],
  location: [
    {
      key: 'Russia', text: 'Russia'
    },
    {
      key: 'China', text: 'China'
    },
    {
      key: 'USA', text: 'USA'
    },
  ]
}

export default data;