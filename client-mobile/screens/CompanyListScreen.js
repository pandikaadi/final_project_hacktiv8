import { useQuery } from '@apollo/client';
import { Text, View, StatusBar, FlatList, ActivityIndicator, Image } from 'react-native';
import { GET_COMPANY } from '../queries/company';
import { styles } from '../styling';

export default function CompanyList() {
  const { loading, error, data } = useQuery(GET_COMPANY)

  if (loading) {
    return <ActivityIndicator size='large' color='#00ff00' />
  }
  if (error) {
    return <Text>Something went wrong........</Text>
  }


  const Card = ({ item }) => {
    return (
      <View style={styles.card} >
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Image style={styles.imageLogo} source={{ uri: item.companyLogo }} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Company List</Text>
      <FlatList
        data={data.getCompanies}
        renderItem={Card}
        keyExtractor={item => item.id}
      />
    </View>
  );
}


