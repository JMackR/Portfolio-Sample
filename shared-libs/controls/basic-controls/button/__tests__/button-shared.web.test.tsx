import React from 'react'
import { textColorForCurrentButtonType, isJSXElement, isLocalSVGSource } from '../button-shared'

describe('textColorForCurrentButtonType', () => {
  describe('type is primary', () => {
    it('should return primary3', () => {
      expect(textColorForCurrentButtonType('primary')).toEqual('primary3')
    })
  })

  describe('type is secondary', () => {
    it('should return primary4', () => {
      expect(textColorForCurrentButtonType('secondary')).toEqual('primary4')
    })
  })

  describe('type is selector', () => {
    it('should return primary3', () => {
      expect(textColorForCurrentButtonType('selector')).toEqual('primary3')
    })
  })

  describe('type is transparent', () => {
    it('should return primary1', () => {
      expect(textColorForCurrentButtonType('transparent')).toEqual('primary1')
    })
  })

  describe('type is disabled', () => {
    it('should return primary2', () => {
      expect(textColorForCurrentButtonType('disabled')).toEqual('primary2')
    })
  })

  describe('type is danger', () => {
    it('should return primary4', () => {
      expect(textColorForCurrentButtonType('danger')).toEqual('primary4')
    })
  })
})

describe('isJSXElement', () => {
  describe('element is undefined', () => {
    it('should return falsy', () => {
      expect(isJSXElement(undefined)).toBeFalsy()
    })
  })

  describe('element is a JSX Element', () => {
    it('should return truthy', () => {
      expect(isJSXElement(<div />)).toBeTruthy()
    })
  })

  describe('element is not a JSX Element', () => {
    it('should return falsy', () => {
      expect(isJSXElement({})).toBeFalsy()
    })
  })
})

describe('isLocalSVGSource', () => {
  describe('element is undefined', () => {
    it('should return falsy', () => {
      expect(isLocalSVGSource(undefined)).toBeFalsy()
    })
  })

  describe('element is not a svg', () => {
    it('should return falsy', () => {
      expect(isLocalSVGSource({})).toBeFalsy()
    })
  })

  describe('element is a svg', () => {
    it('should return falsy', () => {
      expect(isLocalSVGSource({ SVG: 'Test' })).toBeTruthy()
    })
  })
})
