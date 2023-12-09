export * from './database.types';
export * from './entities.types';
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient'
// import {Bucket} from '@supabase/storage-js/src/lib/types'
import {StorageError} from '@supabase/storage-js/src/lib/errors'


export type SuperBaseClient = SupabaseClient;
export type SuperBaseBucket = Record<string, any>//Bucket
export type SuperBaseData = Record<string, any> | Array<Record<string, any>>


export interface SuperBaseStorageError extends StorageError {
    message: string,
    statusCode?: string,
    error?: string,
    stack?: string
}

export interface SuperBaseDatabaseError {
    message: string,
    code: string,
    details: string,
    hint: string
}


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

export type SuperBaseDatabaseReponse<T= any | null> = {
    data: T;
    error: null;
} | {
    data: null;
    error: SuperBaseDatabaseError;
}



export enum SuperBaseStorageErrorTypes {
    DEFAULT = 'ERROR',
    TIMEOUT = 'TIME-OUT',
    BUCKETNOTFOUND = 'BUCKET-NOT-FOUND',
    FILENOTFOUND="FILE-NOT-FOUND",
    FILETOOLARGE="FILE-TOO-LARGE",
    FILEALREADYEXIST="FILE-ALREADY-EXIST",
}

export enum SuperBaseDatabaseErrorTypes {
    DEFAULT = 'ERROR',
    TIMEOUT = 'TIME-OUT',
    TBNOTFOUND = 'TABLE-NOT-FOUND',
}


export enum SuperBaseDatbaseNames {
    ASSET   = 'asset_tb',
    FACULTY = 'faculty_tb',
    COURSE  = 'course_tb',
    DEPARTMENT  = 'department_tb',
    MATERIALS  = 'materials',
    COURSE_DEPARTMENT  = 'courses_departments'
}

export enum SuperBaseDatbaseTableColumns {
    ASSET   = 'id, created_at, updated_at, path, fullPath, access, download, storage_id',
    FACULTY = 'id, created_at, updated_at,',
    COURSE  = 'id, created_at, updated_at,',
    DEPARTMENT  = 'id, created_at, updated_at,',
    MATERIALS  = 'id, created_at, updated_at,',
    COURSE_DEPARTMENT  = 'id, created_at, updated_at,'
}


// Database interface

export type QueryFilter = {
    at: string,
    is: string
}