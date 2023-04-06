import { ParsedUrlQuery } from 'querystring'
import { Url, format, parse } from 'url'
import React from 'react'
// import Router from 'next/router'
// import { useSearch, SearchParamsProps } from 'shared/providers'

// const QUERY_KEYS_TO_NOT_PUT_IN_URL = ['query', 'enabled_features', 'limit']

export const useSearchURLQueryParams = () => {
  //   const { state } = useSearch()

  //   const getURLQueryParams = (): ParsedUrlQuery =>
  //     Object.keys(state.searchParams)
  //       .filter((key) => !QUERY_KEYS_TO_NOT_PUT_IN_URL.includes(key))
  //       .reduce((accumulator: ParsedUrlQuery, key: string) => {
  //         const value = state.searchParams[key as keyof SearchParamsProps]
  //         if (value) {
  //           accumulator[key] = value
  //         }
  //         return accumulator
  //       }, {})

  const generateQueryParamsForURLBar = (queryParams: ParsedUrlQuery): ParsedUrlQuery => {
    // if (state.searchParams.query && !queryParams.q) {
    //   queryParams.q = state.searchParams.query
    // }
    // return queryParams
  }

  React.useEffect(() => {
    // const queryParams = getURLQueryParams()
    // const urlStr = format({
    //   //   pathname: Router.pathname,
    //   query: generateQueryParamsForURLBar(queryParams),
    // })
    // const url: Url = parse(urlStr)
    // Router.push(url, undefined, { shallow: true })
  }, [])
}
