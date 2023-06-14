import pathParser from 'node:path'

import { Warning, isURL } from '@kubb/core'

import SwaggerParser from '@apidevtools/swagger-parser'
import swagger2openapi from 'swagger2openapi'

import { isOpenApiV3Document } from '../utils/index.ts'

import type { KubbConfig } from '@kubb/core'
import type oas from 'oas'
import type oasNormalize from 'oas-normalize'
import type { OASDocument } from 'oas/dist/rmoas.types.ts'
import type { OpenAPIV2 } from 'openapi-types'

type Oas = typeof oas

// TODO should be import Oas from "oas";
// TODO add issue for oas to also include `exports` for ESM
const Oas = require('oas').default as Oas
const OASNormalize = require('oas-normalize').default as typeof oasNormalize

export type OasOptions = {
  validate?: boolean
}

function convertSwagger2ToOpenApi(document: OASDocument): Promise<OASDocument> {
  const options = { anchors: true }
  return new Promise((resolve, reject) => {
    swagger2openapi.convertObj(document as unknown as OpenAPIV2.Document, options, (err, value) => {
      if (err) {
        reject(err)
      } else {
        resolve(value.openapi as OASDocument)
      }
    })
  })
}

export async function oasPathParser(pathOrApi: string, { validate }: OasOptions = {}) {
  if (validate) {
    const oas = new OASNormalize(pathOrApi, { enablePaths: true, colorizeErrors: true })

    try {
      await oas.validate()
    } catch (e) {
      const error = e as Error
      throw new Warning(error?.message, { cause: error })
    }
  }

  const document = (await SwaggerParser.parse(pathOrApi)) as OASDocument

  if (!isOpenApiV3Document(document)) {
    const convertedDocument = await convertSwagger2ToOpenApi(document)
    return Oas.init(convertedDocument)
  }
  return Oas.init(document)
}

export async function oasParser(config: KubbConfig, options: OasOptions = {}) {
  let pathOrApi = ''
  if (isURL(config.input.path)) {
    pathOrApi = config.input.path
  } else {
    pathOrApi = pathParser.resolve(config.root, config.input.path)
  }

  return oasPathParser(pathOrApi, options)
}
