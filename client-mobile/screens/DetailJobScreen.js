import { useQuery } from "@apollo/client";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import { GET_JOBS_ID } from "../queries/job";
import { styles } from "../styling";


export default function DetailJob({ route }) {
  // console.log(route.params.jobId)
  const { loading, error, data } = useQuery(GET_JOBS_ID, {
    variables: {
      "getJobByIdId": route.params.jobId
    }
  })

  if (loading) {
    return <ActivityIndicator size='large' color='#00ff00' />
  }

  if (error) {
    return <Text>Something went wrong........</Text>
  }

  return (
    <View style={styles.detailParent}>

      <View style={styles.cardDetail} >
        <StatusBar style="auto" />
        <Text style={styles.titleDetail}>{data.getJobById.title}</Text>
        <Text>Job Type: {data.getJobById.jobType}</Text>
        <Text>Company: {data.getJobById.Company.name}</Text>
        {
          data.getJobById.Skills[0] ?
            <Text>Skill: {data.getJobById.Skills[0].name} Level:{data.getJobById.Skills[0].level}</Text> :
            null
        }
        {
          data.getJobById.Skills[1] ? <Text>Skill: {data.getJobById.Skills[1].name} Level: {data.getJobById.Skills[1].level}</Text> : null
        }
        <Text style={styles.descriptionDetail}>{data.getJobById.description}</Text>

      </View>
    </View>
  )
}