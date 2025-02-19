import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('1'); // Default value for USA
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Implement your form submission logic here
    console.log('Form submitted:', {
      fullName,
      email,
      countryCode,
      phone,
      password,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#81d3cf' }}>
      <View style={styles.back}>
        <Text style={{color: 'white'}}>Create a free account</Text>
        <Text style={{color: 'white'}}>
          or <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
        </Text>

        <View style={{marginVertical: 10}}>
          <Text style={{color: 'white'}}>Full Name</Text>
          <TextInput
            placeholder="e.g John Doe"
            style={{
              borderColor: 'white',
              borderWidth: 1,
              color: 'white',
              padding: 10,
            }}
            value={fullName}
            onChangeText={text => setFullName(text)}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={{color: 'white'}}>Email</Text>
          <TextInput
            placeholder="Email"
            style={{
              borderColor: 'white',
              borderWidth: 1,
              color: 'white',
              padding: 10,
            }}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={{color: 'white'}}>Phone Number</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Picker
              selectedValue={countryCode}
              onValueChange={itemValue => setCountryCode(itemValue.toString())}
              style={{width: 100, color: 'white'}}>
              <Picker.Item label="USA (+1)" value="1" />
              <Picker.Item label="Nigeria (+234)" value="234" />
              <Picker.Item label="UK (+44)" value="44" />
              <Picker.Item value="213" label="Algeria (+213)" />
              <Picker.Item value="376" label="Andorra (+376)" />
              <Picker.Item value="244" label="Angola (+244)" />
              <Picker.Item value="1264" label="Anguilla (+1264)" />
              <Picker.Item value="1268" label="Antigua &amp; Barbuda (+1268)" />
              <Picker.Item value="54" label="Argentina (+54)" />
              <Picker.Item value="374" label="Armenia (+374)" />
              <Picker.Item value="297" label="Aruba (+297)" />
              <Picker.Item value="61" label="Australia (+61)" />
              <Picker.Item value="43" label="Austria (+43)" />
              <Picker.Item value="994" label="Azerbaijan (+994)" />
              <Picker.Item value="1242" label="Bahamas (+1242)" />
              <Picker.Item value="973" label="Bahrain (+973)" />
              <Picker.Item value="880" label="Bangladesh (+880)" />
              <Picker.Item value="1246" label="Barbados (+1246)" />
              <Picker.Item value="375" label="Belarus (+375)" />
              <Picker.Item value="32" label="Belgium (+32)" />
              <Picker.Item value="501" label="Belize (+501)" />
              <Picker.Item value="229" label="Benin (+229)" />
              <Picker.Item value="1441" label="Bermuda (+1441)" />
              <Picker.Item value="975" label="Bhutan (+975)" />
              <Picker.Item value="591" label="Bolivia (+591)" />
              <Picker.Item value="387" label="Bosnia Herzegovina (+387)" />
              <Picker.Item value="267" label="Botswana (+267)" />
              <Picker.Item value="55" label="Brazil (+55)" />
              <Picker.Item value="673" label="Brunei (+673)" />
              <Picker.Item value="359" label="Bulgaria (+359)" />
              <Picker.Item value="226" label="Burkina Faso (+226)" />
              <Picker.Item value="257" label="Burundi (+257)" />
              <Picker.Item value="855" label="Cambodia (+855)" />
              <Picker.Item value="237" label="Cameroon (+237)" />
              <Picker.Item value="1" label="Canada (+1)" />
              <Picker.Item value="238" label="Cape Verde Islands (+238)" />
              <Picker.Item value="1345" label="Cayman Islands (+1345)" />
              <Picker.Item value="236" label="Central African Republic (+236)" />
              <Picker.Item value="56" label="Chile (+56)" />
              <Picker.Item value="86" label="China (+86)" />
              <Picker.Item value="57" label="Colombia (+57)" />
              <Picker.Item value="269" label="Comoros (+269)" />
              <Picker.Item value="242" label="Congo (+242)" />
              <Picker.Item value="682" label="Cook Islands (+682)" />
              <Picker.Item value="506" label="Costa Rica (+506)" />
              <Picker.Item value="385" label="Croatia (+385)" />
              <Picker.Item value="53" label="Cuba (+53)" />
              <Picker.Item value="90392" label="Cyprus North (+90392)" />
              <Picker.Item value="357" label="Cyprus South (+357)" />
              <Picker.Item value="42" label="Czech Republic (+42)" />
              <Picker.Item value="45" label="Denmark (+45)" />
              <Picker.Item value="253" label="Djibouti (+253)" />
              <Picker.Item value="1809" label="Dominica (+1809)" />
              <Picker.Item value="1809" label="Dominican Republic (+1809)" />
              <Picker.Item value="593" label="Ecuador (+593)" />
              <Picker.Item value="20" label="Egypt (+20)" />
              <Picker.Item value="503" label="El Salvador (+503)" />
              <Picker.Item value="240" label="Equatorial Guinea (+240)" />
              <Picker.Item value="291" label="Eritrea (+291)" />
              <Picker.Item value="372" label="Estonia (+372)" />
              <Picker.Item value="251" label="Ethiopia (+251)" />
              <Picker.Item value="500" label="Falkland Islands (+500)" />
              <Picker.Item value="298" label="Faroe Islands (+298)" />
              <Picker.Item value="679" label="Fiji (+679)" />
              <Picker.Item value="358" label="Finland (+358)" />
              <Picker.Item value="33" label="France (+33)" />
              <Picker.Item value="594" label="French Guiana (+594)" />
              <Picker.Item value="689" label="French Polynesia (+689)" />
              <Picker.Item value="241" label="Gabon (+241)" />
              <Picker.Item value="220" label="Gambia (+220)" />
              <Picker.Item value="7880" label="Georgia (+7880)" />
              <Picker.Item value="49" label="Germany (+49)" />
              <Picker.Item value="233" label="Ghana (+233)" />
              <Picker.Item value="350" label="Gibraltar (+350)" />
              <Picker.Item value="30" label="Greece (+30)" />
              <Picker.Item value="299" label="Greenland (+299)" />
              <Picker.Item value="1473" label="Grenada (+1473)" />
              <Picker.Item value="590" label="Guadeloupe (+590)" />
              <Picker.Item value="671" label="Guam (+671)" />
              <Picker.Item value="502" label="Guatemala (+502)" />
              <Picker.Item value="224" label="Guinea (+224)" />
              <Picker.Item value="245" label="Guinea - Bissau (+245)" />
              <Picker.Item value="592" label="Guyana (+592)" />
              <Picker.Item value="509" label="Haiti (+509)" />
              <Picker.Item value="504" label="Honduras (+504)" />
              <Picker.Item value="852" label="Hong Kong (+852)" />
              <Picker.Item value="36" label="Hungary (+36)" />
              <Picker.Item value="354" label="Iceland (+354)" />
              <Picker.Item value="91" label="India (+91)" />
              <Picker.Item value="62" label="Indonesia (+62)" />
              <Picker.Item value="98" label="Iran (+98)" />
              <Picker.Item value="964" label="Iraq (+964)" />
              <Picker.Item value="353" label="Ireland (+353)" />
              <Picker.Item value="972" label="Israel (+972)" />
              <Picker.Item value="39" label="Italy (+39)" />
              <Picker.Item value="1876" label="Jamaica (+1876)" />
              <Picker.Item value="81" label="Japan (+81)" />
              <Picker.Item value="962" label="Jordan (+962)" />
              <Picker.Item value="7" label="Kazakhstan (+7)" />
              <Picker.Item value="254" label="Kenya (+254)" />
              <Picker.Item value="686" label="Kiribati (+686)" />
              <Picker.Item value="850" label="Korea North (+850)" />
              <Picker.Item value="82" label="Korea South (+82)" />
              <Picker.Item value="965" label="Kuwait (+965)" />
              <Picker.Item value="996" label="Kyrgyzstan (+996)" />
              <Picker.Item value="856" label="Laos (+856)" />
              <Picker.Item value="371" label="Latvia (+371)" />
              <Picker.Item value="961" label="Lebanon (+961)" />
              <Picker.Item value="266" label="Lesotho (+266)" />
              <Picker.Item value="231" label="Liberia (+231)" />
              <Picker.Item value="218" label="Libya (+218)" />
              <Picker.Item value="417" label="Liechtenstein (+417)" />
              <Picker.Item value="370" label="Lithuania (+370)" />
              <Picker.Item value="352" label="Luxembourg (+352)" />
              <Picker.Item value="853" label="Macao (+853)" />
              <Picker.Item value="389" label="Macedonia (+389)" />
              <Picker.Item value="261" label="Madagascar (+261)" />
              <Picker.Item value="265" label="Malawi (+265)" />
              <Picker.Item value="60" label="Malaysia (+60)" />
              <Picker.Item value="960" label="Maldives (+960)" />
              <Picker.Item value="223" label="Mali (+223)" />
              <Picker.Item value="356" label="Malta (+356)" />
              <Picker.Item value="692" label="Marshall Islands (+692)" />
              <Picker.Item value="596" label="Martinique (+596)" />
              <Picker.Item value="222" label="Mauritania (+222)" />
              <Picker.Item value="269" label="Mayotte (+269)" />
              <Picker.Item value="52" label="Mexico (+52)" />
              <Picker.Item value="691" label="Micronesia (+691)" />
              <Picker.Item value="373" label="Moldova (+373)" />
              <Picker.Item value="377" label="Monaco (+377)" />
              <Picker.Item value="976" label="Mongolia (+976)" />
              <Picker.Item value="1664" label="Montserrat (+1664)" />
              <Picker.Item value="212" label="Morocco (+212)" />
              <Picker.Item value="258" label="Mozambique (+258)" />
              <Picker.Item value="95" label="Myanmar (+95)" />
              <Picker.Item value="264" label="Namibia (+264)" />
              <Picker.Item value="674" label="Nauru (+674)" />
              <Picker.Item value="977" label="Nepal (+977)" />
              <Picker.Item value="31" label="Netherlands (+31)" />
              <Picker.Item value="687" label="New Caledonia (+687)" />
              <Picker.Item value="64" label="New Zealand (+64)" />
              <Picker.Item value="505" label="Nicaragua (+505)" />
              <Picker.Item value="227" label="Niger (+227)" />
              <Picker.Item value="683" label="Niue (+683)" />
              <Picker.Item value="672" label="Norfolk Islands (+672)" />
              <Picker.Item value="670" label="Northern Marianas (+670)" />
              <Picker.Item value="47" label="Norway (+47)" />
              <Picker.Item value="968" label="Oman (+968)" />
              <Picker.Item value="680" label="Palau (+680)" />
              <Picker.Item value="507" label="Panama (+507)" />
              <Picker.Item value="675" label="Papua New Guinea (+675)" />
              <Picker.Item value="595" label="Paraguay (+595)" />
              <Picker.Item value="51" label="Peru (+51)" />
              <Picker.Item value="63" label="Philippines (+63)" />
              <Picker.Item value="48" label="Poland (+48)" />
              <Picker.Item value="351" label="Portugal (+351)" />
              <Picker.Item value="1787" label="Puerto Rico (+1787)" />
              <Picker.Item value="974" label="Qatar (+974)" />
              <Picker.Item value="262" label="Reunion (+262)" />
              <Picker.Item value="40" label="Romania (+40)" />
              <Picker.Item value="7" label="Russia (+7)" />
              <Picker.Item value="250" label="Rwanda (+250)" />
              <Picker.Item value="378" label="San Marino (+378)" />
              <Picker.Item value="239" label="Sao Tome &amp; Principe (+239)" />
              <Picker.Item value="966" label="Saudi Arabia (+966)" />
              <Picker.Item value="221" label="Senegal (+221)" />
              <Picker.Item value="381" label="Serbia (+381)" />
              <Picker.Item value="248" label="Seychelles (+248)" />
              <Picker.Item value="232" label="Sierra Leone (+232)" />
              <Picker.Item value="65" label="Singapore (+65)" />
              <Picker.Item value="421" label="Slovak Republic (+421)" />
              <Picker.Item value="386" label="Slovenia (+386)" />
              <Picker.Item value="677" label="Solomon Islands (+677)" />
              <Picker.Item value="252" label="Somalia (+252)" />
              <Picker.Item value="27" label="South Africa (+27)" />
              <Picker.Item value="34" label="Spain (+34)" />
              <Picker.Item value="94" label="Sri Lanka (+94)" />
              <Picker.Item value="290" label="St. Helena (+290)" />
              <Picker.Item value="1869" label="St. Kitts (+1869)" />
              <Picker.Item value="1758" label="St. Lucia (+1758)" />
              <Picker.Item value="249" label="Sudan (+249)" />
              <Picker.Item value="597" label="Suriname (+597)" />
              <Picker.Item value="268" label="Swaziland (+268)" />
              <Picker.Item value="46" label="Sweden (+46)" />
              <Picker.Item value="41" label="Switzerland (+41)" />
              <Picker.Item value="963" label="Syria (+963)" />
              <Picker.Item value="886" label="Taiwan (+886)" />
              <Picker.Item value="7" label="Tajikstan (+7)" />
              <Picker.Item value="66" label="Thailand (+66)" />
              <Picker.Item value="228" label="Togo (+228)" />
              <Picker.Item value="676" label="Tonga (+676)" />
              <Picker.Item value="1868" label="Trinidad &amp; Tobago (+1868)" />
              <Picker.Item value="216" label="Tunisia (+216)" />
              <Picker.Item value="90" label="Turkey (+90)" />
              <Picker.Item value="7" label="Turkmenistan (+7)" />
              <Picker.Item value="993" label="Turkmenistan (+993)" />
              <Picker.Item value="1649" label="Turks &amp; Caicos Islands (+1649)" />
              <Picker.Item value="688" label="Tuvalu (+688)" />
              <Picker.Item value="256" label="Uganda (+256)" />
              <Picker.Item value="380" label="Ukraine (+380)" />
              <Picker.Item value="971" label="United Arab Emirates (+971)" />
              <Picker.Item value="598" label="Uruguay (+598)" />
              <Picker.Item value="7" label="Uzbekistan (+7)" />
              <Picker.Item value="678" label="Vanuatu (+678)" />
              <Picker.Item value="379" label="Vatican City (+379)" />
              <Picker.Item value="58" label="Venezuela (+58)" />
              <Picker.Item value="84" label="Vietnam (+84)" />
              <Picker.Item value="84" label="Virgin Islands - British (+1284)" />
              <Picker.Item value="84" label="Virgin Islands - US (+1340)" />
              <Picker.Item value="681" label="Wallis &amp; Futuna (+681)" />
              <Picker.Item value="969" label="Yemen (North)(+969)" />
              <Picker.Item value="967" label="Yemen (South)(+967)" />
              <Picker.Item value="260" label="Zambia (+260)" />
              <Picker.Item value="263" label="Zimbabwe (+263)" />
            </Picker>
            <TextInput
              placeholder="1234567890"
              style={{
                borderColor: 'white',
                borderWidth: 1,
                color: 'white',
                padding: 10,
                flex: 1,
              }}
              value={phone}
              onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={{color: 'white'}}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={{
              borderColor: 'white',
              borderWidth: 1,
              color: 'white',
              padding: 10,
            }}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        {/* Add your error messages here if needed */}

        {/* Add your reCAPTCHA input here if needed */}

        <TouchableOpacity
          onPress={handleSubmit}
          style={{backgroundColor: '#25d366', padding: 10, alignItems: 'center'}}>
          <Text style={{color: 'white'}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    padding: "150px 50px 50px 50px",
    backgroundColor: "rgba(8, 19, 33, 0.6)",
    marginTop: "25%",
  },
  homepageContainer: {
    textAlign: 'center',
    backgroundColor: '#81d3cf',
    position: 'relative',
  },
  navbar: {
    backgroundColor: '#25d366',
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 48,
    width: 48,
  },
  textContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#81d3cf',
  },
  heading: {
    color: '#333',
    fontSize: 80,
  },
  subtext: {
    color: '#666',
    fontSize: 20,
  },
  Button: {
    backgroundColor: '#075e54',
    color: '#fff', // Note: React Native doesn't use color for text, you would set this in the Text component
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 0, // React Native uses `borderWidth` instead of `border`
    borderColor: 'transparent', // React Native uses `borderColor` instead of `border`
  },
});

export default Signup;
