export * from './database.types';
export * from './entities.types';
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient'
import {Bucket} from '@supabase/storage-js/src/lib/types'
import {StorageError} from '@supabase/storage-js/src/lib/errors'


export type SuperBaseClient = SupabaseClient;
export type SuperBaseBucket = Record<string, any>//Bucket
export type SuperBaseStorageError = StorageError


export type BucketName = 'test-resource';

export enum BucketType {
    RESOURCES = 'test-resource'
}


export interface BucketOptions {
    bucket: BucketType,
    is_public?: boolean,
    maxSize?: number
}


// ? Refer to https://supabase.com/docs/reference/javascript/storage-from-upload
export interface StorageUploadConfig {
    path: string,
    asset: File,
    fileOptions?: {
        cacheControl?: string,
        contentType?: string,
        duplex?: string,
        upsert?: boolean
    }
}

export interface StorageAccessConfig {
    path: string,
    options?: {
        download?: string | boolean,
        // ! Not supporting transform
    }
}

export type SuperBaseStorageReponse = {
    data: SuperBaseBucket;
    error: null;
} | {
    data: null;
    error: SuperBaseStorageError;
}
