import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'
import GraphQLUpload from "graphql-upload/public/GraphQLUpload.js"

export default () => ({
	Date: GraphQLDate,
	Time: GraphQLTime,
	DateTime: GraphQLDateTime,
	JSON: GraphQLJSON,
	JSONObject: GraphQLJSONObject,
	Upload: GraphQLUpload,
})
