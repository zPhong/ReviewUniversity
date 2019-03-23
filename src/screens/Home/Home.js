import * as React from 'react';
import AutoCompleteTextInput from './components/AutoCompleteTextInput';
import './css/Home.css';
import UniversityList from './components/UniversityList';
import apiModel from '../../api/APIModel';
import moment from 'moment';

const Title = 'Review trường đại học';
const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua &amp; Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia &amp; Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central Arfrican Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote D Ivoire',
  'Croatia',
  'Cuba',
  'Curacao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Polynesia',
  'French West Indies',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauro',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Pierre &amp; Miquelon',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'St Kitts &amp; Nevis',
  'St Lucia',
  'St Vincent',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  "Timor L'Este",
  'Togo',
  'Tonga',
  'Trinidad &amp; Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks &amp; Caicos',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCount: 3,
      data: [],
      recentReviews: []
    };
  }

  async componentWillMount() {
    const data = await apiModel.getUniversities();
    let recentReviews = await apiModel.getRecentReviews();
    recentReviews = recentReviews.reverse();
    // console.log("aaa", recentReviews);
    this.setState({ data, recentReviews });
  }

  formatDate = (milisec) => {
    return moment(milisec).format('HH:mm, DD/MM/YYYY');
  };

  renderTitle = () => {
    return (
      <div className="Title">
        <h2 className="font-weight-bold text-light mb-5">{Title}</h2>
        <form className="mb-3">
          <div className="form-row TitleForm">
            <div className="d-flex flex-fill h-100">
              <AutoCompleteTextInput suggestions={countries} />
            </div>
            <div className="col-auto px-0">
              <button className="btn btn-danger" type="button" id="button-addon2">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  renderRecentReviews = (data) => {
    return (
      <div className="col-4 d-flex flex-column pl-5">
        <h1>Recent reviews</h1>
        {data.map((item) => (
          <p className="d-flex flex-column pb-3">
            <a href="#">{item.context}</a>
            <p className="max-text">{this.formatDate(item.createAt)}</p>
          </p>
        ))}
      </div>
    );
  };

  onShowMoreClick = () => {
    const { displayCount } = this.state;
    this.setState({ displayCount: displayCount + 2 });
  };

  render() {
    const { displayCount, data, recentReviews } = this.state;
    return (
      <div className="Container">
        <div className="px-3 bg-dark pb-1">{this.renderTitle()}</div>
        <div className="px-3 general-content pb-1">
          <div className="row">
            <div className="col-8">
              <UniversityList data={data} displayCount={displayCount} />
              <button type="submit" className="btn btn-success ml-4" onClick={this.onShowMoreClick}>
                Xem thêm
              </button>
            </div>
            {this.renderRecentReviews(recentReviews)}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
