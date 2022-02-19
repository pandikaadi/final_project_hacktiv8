import {gql} from '@apollo/client'

export const GET_COMPANY = gql`
query GetCompanies {
  getCompanies {
    id
    name
    companyLogo
    location
    email
    description
  }
}`