import { gql } from '@apollo/client'


export const GET_JOBS = gql`
query GetJobs {
  getJobs {
    id
    title
    description
    companyId
    authorId
    jobType
    userMongoId
    Company {
      name
    }
  }
}`

export const GET_JOBS_ID = gql`
query GetJobById($getJobByIdId: ID!) {
  getJobById(id: $getJobByIdId) {
    id
    title
    description
    companyId
    authorId
    jobType
    userMongoId
    Company {
      name
    }
    Skills {
      name
      level
    }
  }
}`