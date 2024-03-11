revoke delete on table "public"."materials_meta" from "anon";

revoke insert on table "public"."materials_meta" from "anon";

revoke references on table "public"."materials_meta" from "anon";

revoke select on table "public"."materials_meta" from "anon";

revoke trigger on table "public"."materials_meta" from "anon";

revoke truncate on table "public"."materials_meta" from "anon";

revoke update on table "public"."materials_meta" from "anon";

revoke delete on table "public"."materials_meta" from "authenticated";

revoke insert on table "public"."materials_meta" from "authenticated";

revoke references on table "public"."materials_meta" from "authenticated";

revoke select on table "public"."materials_meta" from "authenticated";

revoke trigger on table "public"."materials_meta" from "authenticated";

revoke truncate on table "public"."materials_meta" from "authenticated";

revoke update on table "public"."materials_meta" from "authenticated";

revoke delete on table "public"."materials_meta" from "service_role";

revoke insert on table "public"."materials_meta" from "service_role";

revoke references on table "public"."materials_meta" from "service_role";

revoke select on table "public"."materials_meta" from "service_role";

revoke trigger on table "public"."materials_meta" from "service_role";

revoke truncate on table "public"."materials_meta" from "service_role";

revoke update on table "public"."materials_meta" from "service_role";

alter table "public"."materials_meta" drop constraint "materials_meta_asset_id_fkey";

drop table "public"."materials_meta";


