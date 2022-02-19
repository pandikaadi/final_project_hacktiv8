import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navbar: {
    backgroundColor: '#F0F8FF',
    flex: 1 / 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4
  },

  buttonMargin: {
    marginHorizontal: 5
  },

  imageLanding: {
    width: 200,
    height: 50,
    flex: 1 / 12,
  },

  imageLogo: {
    width: 50,
    height: 50,
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    margin: 2,
    marginVertical: 10,
    backgroundColor: '#86C6F4',
    height: 200,
    width: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 4,
  },
  cardDashboard: {
    margin: 10,
    backgroundColor: '#282c34',
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 4,
  },

  textDashboard: {
    fontWeight:'bold',
    color: '#ffffff',
    marginVertical:20
  },
  cardUserDetail: {
    margin: 10,
    backgroundColor: '#282c34',
    borderRadius: 20,
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 4,
  },
  flexDirDashboard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  title: {
    margin: 1,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#08457A',
    textAlign: 'center'
  },

  company: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#000',
  },

  location: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: 'center',
    opacity: 0.7,
  }
  ,
  textCenter: {
    textAlign: 'center'
  },

  cardDetail: {
    margin: 2,
    marginVertical: 10,
    backgroundColor: '#86C6F4',
    height: 200,
    width: 300,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',

    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 4,
  },

  detailParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  titleDetail: {
    fontWeight: 'bold'
  },
  descriptionDetail: {
    fontStyle: 'italic'
  },
  containerView: {
    flex: 1,
    alignItems: "center"
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center"
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },

});




