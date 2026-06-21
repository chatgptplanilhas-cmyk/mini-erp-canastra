--
-- PostgreSQL database dump
--

\restrict VOS4K9abRt49UgxGGJLsfP4cHvXZbrx1glbmF1WTveS327T1oDjU5qSC7AfKEPj

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.10 (Ubuntu 17.10-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP EVENT TRIGGER IF EXISTS pgrst_drop_watch;
DROP EVENT TRIGGER IF EXISTS pgrst_ddl_watch;
DROP EVENT TRIGGER IF EXISTS issue_pg_net_access;
DROP EVENT TRIGGER IF EXISTS issue_pg_graphql_access;
DROP EVENT TRIGGER IF EXISTS issue_pg_cron_access;
DROP EVENT TRIGGER IF EXISTS issue_graphql_placeholder;
DROP PUBLICATION IF EXISTS supabase_realtime;
DROP POLICY IF EXISTS prevendas_update ON public.prevendas;
DROP POLICY IF EXISTS prevendas_select ON public.prevendas;
DROP POLICY IF EXISTS prevendas_insert ON public.prevendas;
DROP POLICY IF EXISTS prevendas_delete ON public.prevendas;
DROP POLICY IF EXISTS "Permitir acesso total roteiro vendas v2" ON public.roteiro_vendas_v2;
DROP POLICY IF EXISTS "Permitir acesso total roteiro vendas" ON public.roteiro_vendas;
DROP POLICY IF EXISTS "Permitir acesso total pedidos fornecedor grupos" ON public.pedidos_fornecedor_grupos;
DROP POLICY IF EXISTS "Permitir acesso total pedidos fornecedor" ON public.pedidos_fornecedor;
ALTER TABLE IF EXISTS ONLY storage.vector_indexes DROP CONSTRAINT IF EXISTS vector_indexes_bucket_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT IF EXISTS s3_multipart_uploads_parts_upload_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT IF EXISTS s3_multipart_uploads_parts_bucket_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads DROP CONSTRAINT IF EXISTS s3_multipart_uploads_bucket_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.objects DROP CONSTRAINT IF EXISTS "objects_bucketId_fkey";
ALTER TABLE IF EXISTS ONLY public.vendas DROP CONSTRAINT IF EXISTS vendas_cliente_id_fkey;
ALTER TABLE IF EXISTS ONLY public.produtos DROP CONSTRAINT IF EXISTS produtos_fornecedor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.pendencias DROP CONSTRAINT IF EXISTS pendencias_venda_id_fkey;
ALTER TABLE IF EXISTS ONLY public.pendencias DROP CONSTRAINT IF EXISTS pendencias_cliente_id_fkey;
ALTER TABLE IF EXISTS ONLY public.pedidos_fornecedor DROP CONSTRAINT IF EXISTS pedidos_fornecedor_produto_id_fkey;
ALTER TABLE IF EXISTS ONLY public.pedidos_fornecedor DROP CONSTRAINT IF EXISTS pedidos_fornecedor_grupo_fk;
ALTER TABLE IF EXISTS ONLY public.pagamentos DROP CONSTRAINT IF EXISTS pagamentos_venda_id_fkey;
ALTER TABLE IF EXISTS ONLY public.movimentacoes_produtos DROP CONSTRAINT IF EXISTS movimentacoes_produtos_venda_id_fkey;
ALTER TABLE IF EXISTS ONLY public.movimentacoes_produtos DROP CONSTRAINT IF EXISTS movimentacoes_produtos_produto_id_fkey;
ALTER TABLE IF EXISTS ONLY public.movimentacoes_produtos DROP CONSTRAINT IF EXISTS movimentacoes_produtos_fornecedor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.itens_venda DROP CONSTRAINT IF EXISTS itens_venda_venda_id_fkey;
ALTER TABLE IF EXISTS ONLY public.itens_venda DROP CONSTRAINT IF EXISTS itens_venda_produto_id_fkey;
ALTER TABLE IF EXISTS ONLY public.itens_venda DROP CONSTRAINT IF EXISTS itens_venda_fornecedor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.delivery DROP CONSTRAINT IF EXISTS delivery_venda_id_fkey;
ALTER TABLE IF EXISTS ONLY public.delivery DROP CONSTRAINT IF EXISTS delivery_cliente_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.webauthn_credentials DROP CONSTRAINT IF EXISTS webauthn_credentials_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.webauthn_challenges DROP CONSTRAINT IF EXISTS webauthn_challenges_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.sso_domains DROP CONSTRAINT IF EXISTS sso_domains_sso_provider_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.sessions DROP CONSTRAINT IF EXISTS sessions_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.sessions DROP CONSTRAINT IF EXISTS sessions_oauth_client_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.saml_relay_states DROP CONSTRAINT IF EXISTS saml_relay_states_sso_provider_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.saml_relay_states DROP CONSTRAINT IF EXISTS saml_relay_states_flow_state_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.saml_providers DROP CONSTRAINT IF EXISTS saml_providers_sso_provider_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_session_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.one_time_tokens DROP CONSTRAINT IF EXISTS one_time_tokens_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_consents DROP CONSTRAINT IF EXISTS oauth_consents_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_consents DROP CONSTRAINT IF EXISTS oauth_consents_client_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_client_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_factors DROP CONSTRAINT IF EXISTS mfa_factors_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_challenges DROP CONSTRAINT IF EXISTS mfa_challenges_auth_factor_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_amr_claims DROP CONSTRAINT IF EXISTS mfa_amr_claims_session_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.identities DROP CONSTRAINT IF EXISTS identities_user_id_fkey;
DROP TRIGGER IF EXISTS update_objects_updated_at ON storage.objects;
DROP TRIGGER IF EXISTS protect_objects_delete ON storage.objects;
DROP TRIGGER IF EXISTS protect_buckets_delete ON storage.buckets;
DROP TRIGGER IF EXISTS enforce_bucket_name_length_trigger ON storage.buckets;
DROP TRIGGER IF EXISTS tr_check_filters ON realtime.subscription;
DROP INDEX IF EXISTS storage.vector_indexes_name_bucket_id_idx;
DROP INDEX IF EXISTS storage.name_prefix_search;
DROP INDEX IF EXISTS storage.idx_objects_bucket_id_name_lower;
DROP INDEX IF EXISTS storage.idx_objects_bucket_id_name;
DROP INDEX IF EXISTS storage.idx_multipart_uploads_list;
DROP INDEX IF EXISTS storage.buckets_analytics_unique_name_idx;
DROP INDEX IF EXISTS storage.bucketid_objname;
DROP INDEX IF EXISTS storage.bname;
DROP INDEX IF EXISTS realtime.subscription_subscription_id_entity_filters_action_filter_selec;
DROP INDEX IF EXISTS realtime.messages_inserted_at_topic_index;
DROP INDEX IF EXISTS realtime.ix_realtime_subscription_entity;
DROP INDEX IF EXISTS public.idx_prevendas_status;
DROP INDEX IF EXISTS public.idx_prevendas_created_at;
DROP INDEX IF EXISTS public.idx_prevendas_cliente;
DROP INDEX IF EXISTS public.idx_pendencias_origem;
DROP INDEX IF EXISTS public.idx_pendencias_cliente_id;
DROP INDEX IF EXISTS auth.webauthn_credentials_user_id_idx;
DROP INDEX IF EXISTS auth.webauthn_credentials_credential_id_key;
DROP INDEX IF EXISTS auth.webauthn_challenges_user_id_idx;
DROP INDEX IF EXISTS auth.webauthn_challenges_expires_at_idx;
DROP INDEX IF EXISTS auth.users_is_anonymous_idx;
DROP INDEX IF EXISTS auth.users_instance_id_idx;
DROP INDEX IF EXISTS auth.users_instance_id_email_idx;
DROP INDEX IF EXISTS auth.users_email_partial_key;
DROP INDEX IF EXISTS auth.user_id_created_at_idx;
DROP INDEX IF EXISTS auth.unique_phone_factor_per_user;
DROP INDEX IF EXISTS auth.sso_providers_resource_id_pattern_idx;
DROP INDEX IF EXISTS auth.sso_providers_resource_id_idx;
DROP INDEX IF EXISTS auth.sso_domains_sso_provider_id_idx;
DROP INDEX IF EXISTS auth.sso_domains_domain_idx;
DROP INDEX IF EXISTS auth.sessions_user_id_idx;
DROP INDEX IF EXISTS auth.sessions_oauth_client_id_idx;
DROP INDEX IF EXISTS auth.sessions_not_after_idx;
DROP INDEX IF EXISTS auth.saml_relay_states_sso_provider_id_idx;
DROP INDEX IF EXISTS auth.saml_relay_states_for_email_idx;
DROP INDEX IF EXISTS auth.saml_relay_states_created_at_idx;
DROP INDEX IF EXISTS auth.saml_providers_sso_provider_id_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_updated_at_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_session_id_revoked_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_parent_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_instance_id_user_id_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_instance_id_idx;
DROP INDEX IF EXISTS auth.recovery_token_idx;
DROP INDEX IF EXISTS auth.reauthentication_token_idx;
DROP INDEX IF EXISTS auth.one_time_tokens_user_id_token_type_key;
DROP INDEX IF EXISTS auth.one_time_tokens_token_hash_hash_idx;
DROP INDEX IF EXISTS auth.one_time_tokens_relates_to_hash_idx;
DROP INDEX IF EXISTS auth.oauth_consents_user_order_idx;
DROP INDEX IF EXISTS auth.oauth_consents_active_user_client_idx;
DROP INDEX IF EXISTS auth.oauth_consents_active_client_idx;
DROP INDEX IF EXISTS auth.oauth_clients_deleted_at_idx;
DROP INDEX IF EXISTS auth.oauth_auth_pending_exp_idx;
DROP INDEX IF EXISTS auth.mfa_factors_user_id_idx;
DROP INDEX IF EXISTS auth.mfa_factors_user_friendly_name_unique;
DROP INDEX IF EXISTS auth.mfa_challenge_created_at_idx;
DROP INDEX IF EXISTS auth.idx_users_name;
DROP INDEX IF EXISTS auth.idx_users_last_sign_in_at_desc;
DROP INDEX IF EXISTS auth.idx_users_email;
DROP INDEX IF EXISTS auth.idx_users_created_at_desc;
DROP INDEX IF EXISTS auth.idx_user_id_auth_method;
DROP INDEX IF EXISTS auth.idx_oauth_client_states_created_at;
DROP INDEX IF EXISTS auth.idx_auth_code;
DROP INDEX IF EXISTS auth.identities_user_id_idx;
DROP INDEX IF EXISTS auth.identities_email_idx;
DROP INDEX IF EXISTS auth.flow_state_created_at_idx;
DROP INDEX IF EXISTS auth.factor_id_created_at_idx;
DROP INDEX IF EXISTS auth.email_change_token_new_idx;
DROP INDEX IF EXISTS auth.email_change_token_current_idx;
DROP INDEX IF EXISTS auth.custom_oauth_providers_provider_type_idx;
DROP INDEX IF EXISTS auth.custom_oauth_providers_identifier_idx;
DROP INDEX IF EXISTS auth.custom_oauth_providers_enabled_idx;
DROP INDEX IF EXISTS auth.custom_oauth_providers_created_at_idx;
DROP INDEX IF EXISTS auth.confirmation_token_idx;
DROP INDEX IF EXISTS auth.audit_logs_instance_id_idx;
ALTER TABLE IF EXISTS ONLY storage.vector_indexes DROP CONSTRAINT IF EXISTS vector_indexes_pkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads DROP CONSTRAINT IF EXISTS s3_multipart_uploads_pkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT IF EXISTS s3_multipart_uploads_parts_pkey;
ALTER TABLE IF EXISTS ONLY storage.objects DROP CONSTRAINT IF EXISTS objects_pkey;
ALTER TABLE IF EXISTS ONLY storage.migrations DROP CONSTRAINT IF EXISTS migrations_pkey;
ALTER TABLE IF EXISTS ONLY storage.migrations DROP CONSTRAINT IF EXISTS migrations_name_key;
ALTER TABLE IF EXISTS ONLY storage.buckets_vectors DROP CONSTRAINT IF EXISTS buckets_vectors_pkey;
ALTER TABLE IF EXISTS ONLY storage.buckets DROP CONSTRAINT IF EXISTS buckets_pkey;
ALTER TABLE IF EXISTS ONLY storage.buckets_analytics DROP CONSTRAINT IF EXISTS buckets_analytics_pkey;
ALTER TABLE IF EXISTS ONLY realtime.schema_migrations DROP CONSTRAINT IF EXISTS schema_migrations_pkey;
ALTER TABLE IF EXISTS ONLY realtime.subscription DROP CONSTRAINT IF EXISTS pk_subscription;
ALTER TABLE IF EXISTS ONLY realtime.messages DROP CONSTRAINT IF EXISTS messages_pkey;
ALTER TABLE IF EXISTS realtime.messages DROP CONSTRAINT IF EXISTS messages_payload_exclusive;
ALTER TABLE IF EXISTS ONLY public.vendas DROP CONSTRAINT IF EXISTS vendas_pkey;
ALTER TABLE IF EXISTS ONLY public.taxas DROP CONSTRAINT IF EXISTS taxas_pkey;
ALTER TABLE IF EXISTS ONLY public.roteiro_vendas_v2 DROP CONSTRAINT IF EXISTS roteiro_vendas_v2_pkey;
ALTER TABLE IF EXISTS ONLY public.roteiro_vendas DROP CONSTRAINT IF EXISTS roteiro_vendas_pkey;
ALTER TABLE IF EXISTS ONLY public.produtos DROP CONSTRAINT IF EXISTS produtos_pkey;
ALTER TABLE IF EXISTS ONLY public.prevendas DROP CONSTRAINT IF EXISTS prevendas_pkey;
ALTER TABLE IF EXISTS ONLY public.pendencias DROP CONSTRAINT IF EXISTS pendencias_pkey;
ALTER TABLE IF EXISTS ONLY public.pedidos_fornecedor DROP CONSTRAINT IF EXISTS pedidos_fornecedor_pkey;
ALTER TABLE IF EXISTS ONLY public.pedidos_fornecedor_grupos DROP CONSTRAINT IF EXISTS pedidos_fornecedor_grupos_pkey;
ALTER TABLE IF EXISTS ONLY public.pagamentos DROP CONSTRAINT IF EXISTS pagamentos_pkey;
ALTER TABLE IF EXISTS ONLY public.movimentacoes_produtos DROP CONSTRAINT IF EXISTS movimentacoes_produtos_pkey;
ALTER TABLE IF EXISTS ONLY public.itens_venda DROP CONSTRAINT IF EXISTS itens_venda_pkey;
ALTER TABLE IF EXISTS ONLY public.fornecedores DROP CONSTRAINT IF EXISTS fornecedores_pkey;
ALTER TABLE IF EXISTS ONLY public.despesas DROP CONSTRAINT IF EXISTS despesas_pkey;
ALTER TABLE IF EXISTS ONLY public.delivery DROP CONSTRAINT IF EXISTS delivery_pkey;
ALTER TABLE IF EXISTS ONLY public.clientes DROP CONSTRAINT IF EXISTS clientes_pkey;
ALTER TABLE IF EXISTS ONLY auth.webauthn_credentials DROP CONSTRAINT IF EXISTS webauthn_credentials_pkey;
ALTER TABLE IF EXISTS ONLY auth.webauthn_challenges DROP CONSTRAINT IF EXISTS webauthn_challenges_pkey;
ALTER TABLE IF EXISTS ONLY auth.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY auth.users DROP CONSTRAINT IF EXISTS users_phone_key;
ALTER TABLE IF EXISTS ONLY auth.sso_providers DROP CONSTRAINT IF EXISTS sso_providers_pkey;
ALTER TABLE IF EXISTS ONLY auth.sso_domains DROP CONSTRAINT IF EXISTS sso_domains_pkey;
ALTER TABLE IF EXISTS ONLY auth.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY auth.schema_migrations DROP CONSTRAINT IF EXISTS schema_migrations_pkey;
ALTER TABLE IF EXISTS ONLY auth.saml_relay_states DROP CONSTRAINT IF EXISTS saml_relay_states_pkey;
ALTER TABLE IF EXISTS ONLY auth.saml_providers DROP CONSTRAINT IF EXISTS saml_providers_pkey;
ALTER TABLE IF EXISTS ONLY auth.saml_providers DROP CONSTRAINT IF EXISTS saml_providers_entity_id_key;
ALTER TABLE IF EXISTS ONLY auth.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_token_unique;
ALTER TABLE IF EXISTS ONLY auth.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_pkey;
ALTER TABLE IF EXISTS ONLY auth.one_time_tokens DROP CONSTRAINT IF EXISTS one_time_tokens_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_consents DROP CONSTRAINT IF EXISTS oauth_consents_user_client_unique;
ALTER TABLE IF EXISTS ONLY auth.oauth_consents DROP CONSTRAINT IF EXISTS oauth_consents_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_clients DROP CONSTRAINT IF EXISTS oauth_clients_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_client_states DROP CONSTRAINT IF EXISTS oauth_client_states_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_authorization_id_key;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_authorization_code_key;
ALTER TABLE IF EXISTS ONLY auth.mfa_factors DROP CONSTRAINT IF EXISTS mfa_factors_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_factors DROP CONSTRAINT IF EXISTS mfa_factors_last_challenged_at_key;
ALTER TABLE IF EXISTS ONLY auth.mfa_challenges DROP CONSTRAINT IF EXISTS mfa_challenges_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_amr_claims DROP CONSTRAINT IF EXISTS mfa_amr_claims_session_id_authentication_method_pkey;
ALTER TABLE IF EXISTS ONLY auth.instances DROP CONSTRAINT IF EXISTS instances_pkey;
ALTER TABLE IF EXISTS ONLY auth.identities DROP CONSTRAINT IF EXISTS identities_provider_id_provider_unique;
ALTER TABLE IF EXISTS ONLY auth.identities DROP CONSTRAINT IF EXISTS identities_pkey;
ALTER TABLE IF EXISTS ONLY auth.flow_state DROP CONSTRAINT IF EXISTS flow_state_pkey;
ALTER TABLE IF EXISTS ONLY auth.custom_oauth_providers DROP CONSTRAINT IF EXISTS custom_oauth_providers_pkey;
ALTER TABLE IF EXISTS ONLY auth.custom_oauth_providers DROP CONSTRAINT IF EXISTS custom_oauth_providers_identifier_key;
ALTER TABLE IF EXISTS ONLY auth.audit_log_entries DROP CONSTRAINT IF EXISTS audit_log_entries_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_amr_claims DROP CONSTRAINT IF EXISTS amr_id_pk;
ALTER TABLE IF EXISTS public.vendas ALTER COLUMN numero_venda DROP DEFAULT;
ALTER TABLE IF EXISTS public.movimentacoes_produtos ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS auth.refresh_tokens ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS storage.vector_indexes;
DROP TABLE IF EXISTS storage.s3_multipart_uploads_parts;
DROP TABLE IF EXISTS storage.s3_multipart_uploads;
DROP TABLE IF EXISTS storage.objects;
DROP TABLE IF EXISTS storage.migrations;
DROP TABLE IF EXISTS storage.buckets_vectors;
DROP TABLE IF EXISTS storage.buckets_analytics;
DROP TABLE IF EXISTS storage.buckets;
DROP TABLE IF EXISTS realtime.subscription;
DROP TABLE IF EXISTS realtime.schema_migrations;
DROP TABLE IF EXISTS realtime.messages;
DROP SEQUENCE IF EXISTS public.vendas_numero_venda_seq;
DROP TABLE IF EXISTS public.vendas_backup_20260523;
DROP TABLE IF EXISTS public.vendas_backup;
DROP TABLE IF EXISTS public.vendas;
DROP TABLE IF EXISTS public.taxas_backup_20260523;
DROP TABLE IF EXISTS public.taxas;
DROP TABLE IF EXISTS public.roteiro_vendas_v2;
DROP TABLE IF EXISTS public.roteiro_vendas;
DROP TABLE IF EXISTS public.produtos_backup_20260523;
DROP TABLE IF EXISTS public.produtos;
DROP TABLE IF EXISTS public.prevendas;
DROP TABLE IF EXISTS public.pendencias_backup_20260523;
DROP TABLE IF EXISTS public.pendencias_backup;
DROP TABLE IF EXISTS public.pendencias;
DROP TABLE IF EXISTS public.pedidos_fornecedor_grupos;
DROP TABLE IF EXISTS public.pedidos_fornecedor_backup_20260523;
DROP TABLE IF EXISTS public.pedidos_fornecedor;
DROP TABLE IF EXISTS public.pagamentos_backup_20260523;
DROP TABLE IF EXISTS public.pagamentos_backup;
DROP TABLE IF EXISTS public.pagamentos;
DROP SEQUENCE IF EXISTS public.movimentacoes_produtos_id_seq;
DROP TABLE IF EXISTS public.movimentacoes_produtos;
DROP TABLE IF EXISTS public.itens_venda_backup_20260523;
DROP TABLE IF EXISTS public.itens_venda;
DROP TABLE IF EXISTS public.fornecedores_backup_20260523;
DROP TABLE IF EXISTS public.fornecedores;
DROP TABLE IF EXISTS public.despesas_backup_20260523;
DROP TABLE IF EXISTS public.despesas;
DROP TABLE IF EXISTS public.delivery_backup_20260523;
DROP TABLE IF EXISTS public.delivery;
DROP TABLE IF EXISTS public.clientes_backup_20260523;
DROP TABLE IF EXISTS public.clientes;
DROP TABLE IF EXISTS auth.webauthn_credentials;
DROP TABLE IF EXISTS auth.webauthn_challenges;
DROP TABLE IF EXISTS auth.users;
DROP TABLE IF EXISTS auth.sso_providers;
DROP TABLE IF EXISTS auth.sso_domains;
DROP TABLE IF EXISTS auth.sessions;
DROP TABLE IF EXISTS auth.schema_migrations;
DROP TABLE IF EXISTS auth.saml_relay_states;
DROP TABLE IF EXISTS auth.saml_providers;
DROP SEQUENCE IF EXISTS auth.refresh_tokens_id_seq;
DROP TABLE IF EXISTS auth.refresh_tokens;
DROP TABLE IF EXISTS auth.one_time_tokens;
DROP TABLE IF EXISTS auth.oauth_consents;
DROP TABLE IF EXISTS auth.oauth_clients;
DROP TABLE IF EXISTS auth.oauth_client_states;
DROP TABLE IF EXISTS auth.oauth_authorizations;
DROP TABLE IF EXISTS auth.mfa_factors;
DROP TABLE IF EXISTS auth.mfa_challenges;
DROP TABLE IF EXISTS auth.mfa_amr_claims;
DROP TABLE IF EXISTS auth.instances;
DROP TABLE IF EXISTS auth.identities;
DROP TABLE IF EXISTS auth.flow_state;
DROP TABLE IF EXISTS auth.custom_oauth_providers;
DROP TABLE IF EXISTS auth.audit_log_entries;
DROP FUNCTION IF EXISTS storage.update_updated_at_column();
DROP FUNCTION IF EXISTS storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text);
DROP FUNCTION IF EXISTS storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text);
DROP FUNCTION IF EXISTS storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text);
DROP FUNCTION IF EXISTS storage.protect_delete();
DROP FUNCTION IF EXISTS storage.operation();
DROP FUNCTION IF EXISTS storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text, sort_order text);
DROP FUNCTION IF EXISTS storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text);
DROP FUNCTION IF EXISTS storage.get_size_by_bucket();
DROP FUNCTION IF EXISTS storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text);
DROP FUNCTION IF EXISTS storage.foldername(name text);
DROP FUNCTION IF EXISTS storage.filename(name text);
DROP FUNCTION IF EXISTS storage.extension(name text);
DROP FUNCTION IF EXISTS storage.enforce_bucket_name_length();
DROP FUNCTION IF EXISTS storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb);
DROP FUNCTION IF EXISTS storage.allow_only_operation(expected_operation text);
DROP FUNCTION IF EXISTS storage.allow_any_operation(expected_operations text[]);
DROP FUNCTION IF EXISTS realtime.wal2json_escape_identifier(name text);
DROP FUNCTION IF EXISTS realtime.topic();
DROP FUNCTION IF EXISTS realtime.to_regrole(role_name text);
DROP FUNCTION IF EXISTS realtime.subscription_check_filters();
DROP FUNCTION IF EXISTS realtime.send_binary(payload bytea, event text, topic text, private boolean);
DROP FUNCTION IF EXISTS realtime.send(payload jsonb, event text, topic text, private boolean);
DROP FUNCTION IF EXISTS realtime.quote_wal2json(entity regclass);
DROP FUNCTION IF EXISTS realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer);
DROP FUNCTION IF EXISTS realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]);
DROP FUNCTION IF EXISTS realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text);
DROP FUNCTION IF EXISTS realtime."cast"(val text, type_ regtype);
DROP FUNCTION IF EXISTS realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]);
DROP FUNCTION IF EXISTS realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text);
DROP FUNCTION IF EXISTS realtime.apply_rls(wal jsonb, max_record_bytes integer);
DROP FUNCTION IF EXISTS pgbouncer.get_auth(p_usename text);
DROP FUNCTION IF EXISTS graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb);
DROP FUNCTION IF EXISTS extensions.set_graphql_placeholder();
DROP FUNCTION IF EXISTS extensions.pgrst_drop_watch();
DROP FUNCTION IF EXISTS extensions.pgrst_ddl_watch();
DROP FUNCTION IF EXISTS extensions.grant_pg_net_access();
DROP FUNCTION IF EXISTS extensions.grant_pg_graphql_access();
DROP FUNCTION IF EXISTS extensions.grant_pg_cron_access();
DROP FUNCTION IF EXISTS auth.uid();
DROP FUNCTION IF EXISTS auth.role();
DROP FUNCTION IF EXISTS auth.jwt();
DROP FUNCTION IF EXISTS auth.email();
DROP TYPE IF EXISTS storage.buckettype;
DROP TYPE IF EXISTS realtime.wal_rls;
DROP TYPE IF EXISTS realtime.wal_column;
DROP TYPE IF EXISTS realtime.user_defined_filter;
DROP TYPE IF EXISTS realtime.equality_op;
DROP TYPE IF EXISTS realtime.action;
DROP TYPE IF EXISTS auth.one_time_token_type;
DROP TYPE IF EXISTS auth.oauth_response_type;
DROP TYPE IF EXISTS auth.oauth_registration_type;
DROP TYPE IF EXISTS auth.oauth_client_type;
DROP TYPE IF EXISTS auth.oauth_authorization_status;
DROP TYPE IF EXISTS auth.factor_type;
DROP TYPE IF EXISTS auth.factor_status;
DROP TYPE IF EXISTS auth.code_challenge_method;
DROP TYPE IF EXISTS auth.aal_level;
DROP EXTENSION IF EXISTS "uuid-ossp";
DROP EXTENSION IF EXISTS supabase_vault;
DROP EXTENSION IF EXISTS pgcrypto;
DROP EXTENSION IF EXISTS pg_stat_statements;
DROP SCHEMA IF EXISTS vault;
DROP SCHEMA IF EXISTS storage;
DROP SCHEMA IF EXISTS realtime;
DROP SCHEMA IF EXISTS pgbouncer;
DROP SCHEMA IF EXISTS graphql_public;
DROP SCHEMA IF EXISTS graphql;
DROP SCHEMA IF EXISTS extensions;
DROP SCHEMA IF EXISTS auth;
--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA auth;


--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA extensions;


--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA graphql;


--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA graphql_public;


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA pgbouncer;


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA realtime;


--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA storage;


--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA vault;


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


--
-- Name: action; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: -
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
begin
    if not exists (
        select 1
        from pg_event_trigger_ddl_commands() ev
        join pg_catalog.pg_extension e on ev.objid = e.oid
        where e.extname = 'pg_graphql'
    ) then
        return;
    end if;

    drop function if exists graphql_public.graphql;
    create or replace function graphql_public.graphql(
        "operationName" text default null,
        query text default null,
        variables jsonb default null,
        extensions jsonb default null
    )
        returns jsonb
        language sql
    as $$
        select graphql.resolve(
            query := query,
            variables := coalesce(variables, '{}'),
            "operationName" := "operationName",
            extensions := extensions
        );
    $$;

    -- Attach the wrapper to the extension so DROP EXTENSION cascades to it,
    -- which in turn triggers set_graphql_placeholder to reinstall the "not enabled" stub.
    alter extension pg_graphql add function graphql_public.graphql(text, text, jsonb, jsonb);

    grant usage on schema graphql to postgres, anon, authenticated, service_role;
    grant execute on function graphql.resolve to postgres, anon, authenticated, service_role;
    grant usage on schema graphql to postgres with grant option;
    grant usage on schema graphql_public to postgres with grant option;
end;
$_$;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: graphql(text, text, jsonb, jsonb); Type: FUNCTION; Schema: graphql_public; Owner: -
--

CREATE FUNCTION graphql_public.graphql("operationName" text DEFAULT NULL::text, query text DEFAULT NULL::text, variables jsonb DEFAULT NULL::jsonb, extensions jsonb DEFAULT NULL::jsonb) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: -
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
    -- Regclass of the table e.g. public.notes
    entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

    -- I, U, D, T: insert, update ...
    action realtime.action = (
        case wal ->> 'action'
            when 'I' then 'INSERT'
            when 'U' then 'UPDATE'
            when 'D' then 'DELETE'
            else 'ERROR'
        end
    );

    -- Is row level security enabled for the table
    is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

    subscriptions realtime.subscription[] = array_agg(subs)
        from
            realtime.subscription subs
        where
            subs.entity = entity_
            -- Filter by action early - only get subscriptions interested in this action
            -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
            and (subs.action_filter = '*' or subs.action_filter = action::text);

    -- Subscription vars
    working_role regrole;
    working_selected_columns text[];
    claimed_role regrole;
    claims jsonb;

    subscription_id uuid;
    subscription_has_access bool;
    visible_to_subscription_ids uuid[] = '{}';

    -- structured info for wal's columns
    columns realtime.wal_column[];
    -- previous identity values for update/delete
    old_columns realtime.wal_column[];

    error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

    -- Primary jsonb output for record
    output jsonb;

    -- Loop record for iterating unique roles (outer loop)
    role_record record;
    -- Loop record for iterating unique selected_columns within a role (inner loop)
    cols_record record;
    -- Subscription ids visible at the role level (before fanning out by selected_columns)
    visible_role_sub_ids uuid[] = '{}';

begin
    perform set_config('role', null, true);

    columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'columns') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    old_columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'identity') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    for role_record in
        select claims_role
        from (select distinct claims_role from unnest(subscriptions)) t
        order by claims_role::text
    loop
        working_role := role_record.claims_role;

        -- Update `is_selectable` for columns and old_columns (once per role)
        columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(columns) c;

        old_columns =
                array_agg(
                    (
                        c.name,
                        c.type_name,
                        c.type_oid,
                        c.value,
                        c.is_pkey,
                        pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                    )::realtime.wal_column
                )
                from
                    unnest(old_columns) c;

        if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
            -- Fan out 400 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 400: Bad Request, no primary key']
                )::realtime.wal_rls;
            end loop;

        -- The claims role does not have SELECT permission to the primary key of entity
        elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
            -- Fan out 401 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 401: Unauthorized']
                )::realtime.wal_rls;
            end loop;

        else
            -- Create the prepared statement (once per role)
            if is_rls_enabled and action <> 'DELETE' then
                if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                    deallocate walrus_rls_stmt;
                end if;
                execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
            end if;

            -- Collect all visible subscription IDs for this role (filter check + RLS check)
            visible_role_sub_ids = '{}';

            for subscription_id, claims in (
                    select
                        subs.subscription_id,
                        subs.claims
                    from
                        unnest(subscriptions) subs
                    where
                        subs.entity = entity_
                        and subs.claims_role = working_role
                        and (
                            realtime.is_visible_through_filters(columns, subs.filters)
                            or (
                              action = 'DELETE'
                              and realtime.is_visible_through_filters(old_columns, subs.filters)
                            )
                        )
            ) loop

                if not is_rls_enabled or action = 'DELETE' then
                    visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                else
                    -- Check if RLS allows the role to see the record
                    perform
                        -- Trim leading and trailing quotes from working_role because set_config
                        -- doesn't recognize the role as valid if they are included
                        set_config('role', trim(both '"' from working_role::text), true),
                        set_config('request.jwt.claims', claims::text, true);

                    execute 'execute walrus_rls_stmt' into subscription_has_access;

                    if subscription_has_access then
                        visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                    end if;
                end if;
            end loop;

            perform set_config('role', null, true);

            -- Inner loop: per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;

                output = jsonb_build_object(
                    'schema', wal ->> 'schema',
                    'table', wal ->> 'table',
                    'type', action,
                    'commit_timestamp', to_char(
                        ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                        'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
                    ),
                    'columns', (
                        select
                            jsonb_agg(
                                jsonb_build_object(
                                    'name', pa.attname,
                                    'type', pt.typname
                                )
                                order by pa.attnum asc
                            )
                        from
                            pg_attribute pa
                            join pg_type pt
                                on pa.atttypid = pt.oid
                            left join (
                                select unnest(conkey) as pkey_attnum
                                from pg_constraint
                                where conrelid = entity_ and contype = 'p'
                            ) pk on pk.pkey_attnum = pa.attnum
                        where
                            attrelid = entity_
                            and attnum > 0
                            and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
                            and (working_selected_columns is null or pa.attname = any(working_selected_columns) or pk.pkey_attnum is not null)
                    )
                )
                -- Add "record" key for insert and update
                || case
                    when action in ('INSERT', 'UPDATE') then
                        jsonb_build_object(
                            'record',
                            (
                                select
                                    jsonb_object_agg(
                                        -- if unchanged toast, get column name and value from old record
                                        coalesce((c).name, (oc).name),
                                        case
                                            when (c).name is null then (oc).value
                                            else (c).value
                                        end
                                    )
                                from
                                    unnest(columns) c
                                    full outer join unnest(old_columns) oc
                                        on (c).name = (oc).name
                                where
                                    coalesce((c).is_selectable, (oc).is_selectable)
                                    and (working_selected_columns is null or coalesce((c).name, (oc).name) = any(working_selected_columns) or coalesce((c).is_pkey, (oc).is_pkey))
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            )
                        )
                    else '{}'::jsonb
                end
                -- Add "old_record" key for update and delete
                || case
                    when action = 'UPDATE' then
                        jsonb_build_object(
                                'old_record',
                                (
                                    select jsonb_object_agg((c).name, (c).value)
                                    from unnest(old_columns) c
                                    where
                                        (c).is_selectable
                                        and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                        and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                )
                            )
                    when action = 'DELETE' then
                        jsonb_build_object(
                            'old_record',
                            (
                                select jsonb_object_agg((c).name, (c).value)
                                from unnest(old_columns) c
                                where
                                    (c).is_selectable
                                    and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                    and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                            )
                        )
                    else '{}'::jsonb
                end;

                -- Filter visible_role_sub_ids to those matching the current selected_columns group
                visible_to_subscription_ids = coalesce(
                    (
                        select array_agg(s.subscription_id)
                        from unnest(subscriptions) s
                        where s.claims_role = working_role
                          and (s.selected_columns is not distinct from working_selected_columns)
                          and s.subscription_id = any(visible_role_sub_ids)
                    ),
                    '{}'::uuid[]
                );

                return next (
                    output,
                    is_rls_enabled,
                    visible_to_subscription_ids,
                    case
                        when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                        else '{}'
                    end
                )::realtime.wal_rls;
            end loop;

        end if;
    end loop;

    perform set_config('role', null, true);
end;
$$;


--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
declare
  res jsonb;
begin
  if type_::text = 'bytea' then
    return to_jsonb(val);
  end if;
  execute format('select to_jsonb(%L::'|| type_::text || ')', val) into res;
  return res;
end
$$;


--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS TABLE(wal jsonb, is_rls_enabled boolean, subscription_ids uuid[], errors text[], slot_changes_count bigint)
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
  WITH pub AS (
    SELECT
      concat_ws(
        ',',
        CASE WHEN bool_or(pubinsert) THEN 'insert' ELSE NULL END,
        CASE WHEN bool_or(pubupdate) THEN 'update' ELSE NULL END,
        CASE WHEN bool_or(pubdelete) THEN 'delete' ELSE NULL END
      ) AS w2j_actions,
      coalesce(
        string_agg(
          realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
          ','
        ) filter (WHERE ppt.tablename IS NOT NULL),
        ''
      ) AS w2j_add_tables
    FROM pg_publication pp
    LEFT JOIN pg_publication_tables ppt ON pp.pubname = ppt.pubname
    WHERE pp.pubname = publication
    GROUP BY pp.pubname
    LIMIT 1
  ),
  -- MATERIALIZED ensures pg_logical_slot_get_changes is called exactly once
  w2j AS MATERIALIZED (
    SELECT x.*, pub.w2j_add_tables
    FROM pub,
         pg_logical_slot_get_changes(
           slot_name, null, max_changes,
           'include-pk', 'true',
           'include-transaction', 'false',
           'include-timestamp', 'true',
           'include-type-oids', 'true',
           'format-version', '2',
           'actions', pub.w2j_actions,
           'add-tables', pub.w2j_add_tables
         ) x
  ),
  slot_count AS (
    SELECT count(*)::bigint AS cnt
    FROM w2j
    WHERE w2j.w2j_add_tables <> ''
  ),
  rls_filtered AS (
    SELECT xyz.wal, xyz.is_rls_enabled, xyz.subscription_ids, xyz.errors
    FROM w2j,
         realtime.apply_rls(
           wal := w2j.data::jsonb,
           max_record_bytes := max_record_bytes
         ) xyz(wal, is_rls_enabled, subscription_ids, errors)
    WHERE w2j.w2j_add_tables <> ''
      AND xyz.subscription_ids[1] IS NOT NULL
  )
  SELECT rf.wal, rf.is_rls_enabled, rf.subscription_ids, rf.errors, sc.cnt
  FROM rls_filtered rf, slot_count sc

  UNION ALL

  SELECT null, null, null, null, sc.cnt
  FROM slot_count sc
  WHERE NOT EXISTS (SELECT 1 FROM rls_filtered)
$$;


--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  SELECT
    realtime.wal2json_escape_identifier(nsp.nspname::text)
    || '.'
    || realtime.wal2json_escape_identifier(pc.relname::text)
  FROM pg_class pc
  JOIN pg_namespace nsp ON pc.relnamespace = nsp.oid
  WHERE pc.oid = entity
$$;


--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    -- Generate a new UUID for the id
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


--
-- Name: send_binary(bytea, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
BEGIN
  BEGIN
    generated_id := gen_random_uuid();

    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    INSERT INTO realtime.messages (id, binary_payload, event, topic, private, extension)
    VALUES (generated_id, payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
    col_names text[] = coalesce(
            array_agg(c.column_name order by c.ordinal_position),
            '{}'::text[]
        )
        from
            information_schema.columns c
        where
            format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
            and pg_catalog.has_column_privilege(
                (new.claims ->> 'role'),
                format('%I.%I', c.table_schema, c.table_name)::regclass,
                c.column_name,
                'SELECT'
            );
    table_col_names text[] = coalesce(
            array_agg(pa.attname),
            '{}'::text[]
        )
        from
            pg_attribute pa
        where
            pa.attrelid = new.entity
            and pa.attnum > 0;
    filter realtime.user_defined_filter;
    col_type regtype;
    in_val jsonb;
    selected_col text;
begin
    for filter in select * from unnest(new.filters) loop
        -- Filtered column is valid
        if not filter.column_name = any(col_names) then
            raise exception 'invalid column for filter %', filter.column_name;
        end if;

        -- Type is sanitized and safe for string interpolation
        col_type = (
            select atttypid::regtype
            from pg_catalog.pg_attribute
            where attrelid = new.entity
                  and attname = filter.column_name
        );
        if col_type is null then
            raise exception 'failed to lookup type for column %', filter.column_name;
        end if;
        if filter.op = 'in'::realtime.equality_op then
            in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
            if coalesce(jsonb_array_length(in_val), 0) > 100 then
                raise exception 'too many values for `in` filter. Maximum 100';
            end if;
        else
            -- raises an exception if value is not coercable to type
            perform realtime.cast(filter.value, col_type);
        end if;
    end loop;

    -- Validate that selected_columns reference columns the role can SELECT
    if new.selected_columns is not null then
        for selected_col in select * from unnest(new.selected_columns) loop
            if not selected_col = any(col_names) then
                raise exception 'invalid column for select %', selected_col;
            end if;
        end loop;
    end if;

    -- Apply consistent order to filters so the unique constraint on
    -- (subscription_id, entity, filters) can't be tricked by a different filter order
    new.filters = coalesce(
        array_agg(f order by f.column_name, f.op, f.value),
        '{}'
    ) from unnest(new.filters) f;

    -- Normalize selected_columns order so ARRAY['a','b'] and ARRAY['b','a'] are
    -- treated as the same subscription group in apply_rls
    new.selected_columns = (
        select array_agg(c order by c)
        from unnest(new.selected_columns) c
    );

    return new;
end;
$$;


--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


--
-- Name: wal2json_escape_identifier(text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.wal2json_escape_identifier(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  -- Prefix `\`, `,`, `.`, and any whitespace with `\`
  SELECT regexp_replace(name, '([\\,.[:space:]])', '\\\1', 'g')
$$;


--
-- Name: allow_any_operation(text[]); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.allow_any_operation(expected_operations text[]) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT CASE
      WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
      ELSE raw_operation
    END AS current_operation
    FROM current_operation
  )
  SELECT EXISTS (
    SELECT 1
    FROM normalized n
    CROSS JOIN LATERAL unnest(expected_operations) AS expected_operation
    WHERE expected_operation IS NOT NULL
      AND expected_operation <> ''
      AND n.current_operation = CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END
  );
$$;


--
-- Name: allow_only_operation(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.allow_only_operation(expected_operation text) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT
      CASE
        WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
        ELSE raw_operation
      END AS current_operation,
      CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END AS requested_operation
    FROM current_operation
  )
  SELECT CASE
    WHEN requested_operation IS NULL OR requested_operation = '' THEN FALSE
    ELSE COALESCE(current_operation = requested_operation, FALSE)
  END
  FROM normalized;
$$;


--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Get the last path segment (the actual filename)
    SELECT _parts[array_length(_parts, 1)] INTO _filename;
    -- Extract extension: reverse, split on '.', then reverse again
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


--
-- Name: get_common_prefix(text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint)::bigint as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


--
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.protect_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


--
-- Name: search_by_timestamp(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: custom_oauth_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.custom_oauth_providers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_type text NOT NULL,
    identifier text NOT NULL,
    name text NOT NULL,
    client_id text NOT NULL,
    client_secret text NOT NULL,
    acceptable_client_ids text[] DEFAULT '{}'::text[] NOT NULL,
    scopes text[] DEFAULT '{}'::text[] NOT NULL,
    pkce_enabled boolean DEFAULT true NOT NULL,
    attribute_mapping jsonb DEFAULT '{}'::jsonb NOT NULL,
    authorization_params jsonb DEFAULT '{}'::jsonb NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    email_optional boolean DEFAULT false NOT NULL,
    issuer text,
    discovery_url text,
    skip_nonce_check boolean DEFAULT false NOT NULL,
    cached_discovery jsonb,
    discovery_cached_at timestamp with time zone,
    authorization_url text,
    token_url text,
    userinfo_url text,
    jwks_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT custom_oauth_providers_authorization_url_https CHECK (((authorization_url IS NULL) OR (authorization_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_authorization_url_length CHECK (((authorization_url IS NULL) OR (char_length(authorization_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_client_id_length CHECK (((char_length(client_id) >= 1) AND (char_length(client_id) <= 512))),
    CONSTRAINT custom_oauth_providers_discovery_url_length CHECK (((discovery_url IS NULL) OR (char_length(discovery_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_identifier_format CHECK ((identifier ~ '^[a-z0-9][a-z0-9:-]{0,48}[a-z0-9]$'::text)),
    CONSTRAINT custom_oauth_providers_issuer_length CHECK (((issuer IS NULL) OR ((char_length(issuer) >= 1) AND (char_length(issuer) <= 2048)))),
    CONSTRAINT custom_oauth_providers_jwks_uri_https CHECK (((jwks_uri IS NULL) OR (jwks_uri ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_jwks_uri_length CHECK (((jwks_uri IS NULL) OR (char_length(jwks_uri) <= 2048))),
    CONSTRAINT custom_oauth_providers_name_length CHECK (((char_length(name) >= 1) AND (char_length(name) <= 100))),
    CONSTRAINT custom_oauth_providers_oauth2_requires_endpoints CHECK (((provider_type <> 'oauth2'::text) OR ((authorization_url IS NOT NULL) AND (token_url IS NOT NULL) AND (userinfo_url IS NOT NULL)))),
    CONSTRAINT custom_oauth_providers_oidc_discovery_url_https CHECK (((provider_type <> 'oidc'::text) OR (discovery_url IS NULL) OR (discovery_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_issuer_https CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NULL) OR (issuer ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_requires_issuer CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NOT NULL))),
    CONSTRAINT custom_oauth_providers_provider_type_check CHECK ((provider_type = ANY (ARRAY['oauth2'::text, 'oidc'::text]))),
    CONSTRAINT custom_oauth_providers_token_url_https CHECK (((token_url IS NULL) OR (token_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_token_url_length CHECK (((token_url IS NULL) OR (char_length(token_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_userinfo_url_https CHECK (((userinfo_url IS NULL) OR (userinfo_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_userinfo_url_length CHECK (((userinfo_url IS NULL) OR (char_length(userinfo_url) <= 2048)))
);


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text,
    code_challenge_method auth.code_challenge_method,
    code_challenge text,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone,
    invite_token text,
    referrer text,
    oauth_client_state_id uuid,
    linking_target_id uuid,
    email_optional boolean DEFAULT false NOT NULL
);


--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.flow_state IS 'Stores metadata for all OAuth/SSO login flows';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    nonce text,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_nonce_length CHECK ((char_length(nonce) <= 255)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


--
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_client_states (
    id uuid NOT NULL,
    provider_type text NOT NULL,
    code_verifier text,
    created_at timestamp with time zone NOT NULL
);


--
-- Name: TABLE oauth_client_states; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.oauth_client_states IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    token_endpoint_auth_method text NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048)),
    CONSTRAINT oauth_clients_token_endpoint_auth_method_check CHECK ((token_endpoint_auth_method = ANY (ARRAY['client_secret_basic'::text, 'client_secret_post'::text, 'none'::text])))
);


--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: -
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: -
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint,
    scopes text,
    CONSTRAINT sessions_scopes_length CHECK ((char_length(scopes) <= 4096))
);


--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: webauthn_challenges; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.webauthn_challenges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    challenge_type text NOT NULL,
    session_data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    CONSTRAINT webauthn_challenges_challenge_type_check CHECK ((challenge_type = ANY (ARRAY['signup'::text, 'registration'::text, 'authentication'::text])))
);


--
-- Name: webauthn_credentials; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.webauthn_credentials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    credential_id bytea NOT NULL,
    public_key bytea NOT NULL,
    attestation_type text DEFAULT ''::text NOT NULL,
    aaguid uuid,
    sign_count bigint DEFAULT 0 NOT NULL,
    transports jsonb DEFAULT '[]'::jsonb NOT NULL,
    backup_eligible boolean DEFAULT false NOT NULL,
    backed_up boolean DEFAULT false NOT NULL,
    friendly_name text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_used_at timestamp with time zone
);


--
-- Name: clientes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clientes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nome text NOT NULL,
    referencia text,
    telefone text,
    observacoes text,
    created_at timestamp without time zone DEFAULT now(),
    ativo boolean DEFAULT true,
    observacao text
);


--
-- Name: clientes_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clientes_backup_20260523 (
    id uuid,
    nome text,
    referencia text,
    telefone text,
    observacoes text,
    created_at timestamp without time zone,
    ativo boolean,
    observacao text
);


--
-- Name: delivery; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery (
    id bigint NOT NULL,
    venda_id uuid,
    data_pedido date DEFAULT CURRENT_DATE NOT NULL,
    data_entrega date,
    cliente_id uuid,
    referencia text,
    local_entrega text,
    descricao text,
    valor_total numeric(10,2) DEFAULT 0,
    status text DEFAULT 'Programado'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    data_confirmacao_entrega date,
    CONSTRAINT delivery_status_check CHECK ((status = ANY (ARRAY['Programado'::text, 'Entregue'::text, 'Cancelado'::text])))
);


--
-- Name: delivery_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_backup_20260523 (
    id bigint,
    venda_id uuid,
    data_pedido date,
    data_entrega date,
    cliente_id uuid,
    referencia text,
    local_entrega text,
    descricao text,
    valor_total numeric(10,2),
    status text,
    created_at timestamp with time zone
);


--
-- Name: delivery_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.delivery ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.delivery_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: despesas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.despesas (
    id bigint NOT NULL,
    data_despesa date DEFAULT CURRENT_DATE NOT NULL,
    categoria text NOT NULL,
    descricao text,
    valor numeric(10,2) DEFAULT 0 NOT NULL,
    observacao text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT despesas_categoria_check CHECK ((categoria = ANY (ARRAY['Abastecimento'::text, 'Degustação'::text, 'Degustações'::text, 'Outros custos'::text])))
);


--
-- Name: despesas_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.despesas_backup_20260523 (
    id bigint,
    data_despesa date,
    categoria text,
    descricao text,
    valor numeric(10,2),
    observacao text,
    created_at timestamp with time zone
);


--
-- Name: despesas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.despesas ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.despesas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: fornecedores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fornecedores (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    nome text,
    contato text,
    telefone text,
    cidade text,
    observacao text,
    ativo boolean DEFAULT true
);


--
-- Name: fornecedores_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fornecedores_backup_20260523 (
    id bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    nome text,
    contato text,
    telefone text,
    cidade text,
    observacao text,
    ativo boolean
);


--
-- Name: fornecedores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.fornecedores ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.fornecedores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: itens_venda; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.itens_venda (
    id bigint NOT NULL,
    venda_id uuid,
    produto_id uuid,
    fornecedor_id bigint,
    quantidade numeric(10,2) DEFAULT 0,
    preco_custo numeric(10,2) DEFAULT 0,
    preco_venda numeric(10,2) DEFAULT 0,
    subtotal_custo numeric(10,2) DEFAULT 0,
    subtotal_venda numeric(10,2) DEFAULT 0,
    lucro numeric(10,2) DEFAULT 0,
    observacao text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: itens_venda_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.itens_venda_backup_20260523 (
    id bigint,
    venda_id uuid,
    produto_id uuid,
    fornecedor_id bigint,
    quantidade numeric(10,2),
    preco_custo numeric(10,2),
    preco_venda numeric(10,2),
    subtotal_custo numeric(10,2),
    subtotal_venda numeric(10,2),
    lucro numeric(10,2),
    observacao text,
    created_at timestamp with time zone
);


--
-- Name: itens_venda_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.itens_venda ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.itens_venda_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movimentacoes_produtos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movimentacoes_produtos (
    id bigint NOT NULL,
    venda_id uuid,
    produto_id uuid,
    fornecedor_id bigint,
    data_movimentacao date DEFAULT CURRENT_DATE,
    numero_venda integer,
    quantidade integer DEFAULT 1 NOT NULL,
    preco_custo numeric DEFAULT 0,
    preco_venda numeric DEFAULT 0,
    valor_total numeric DEFAULT 0,
    custo_total numeric DEFAULT 0,
    lucro_total numeric DEFAULT 0,
    observacao text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: movimentacoes_produtos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.movimentacoes_produtos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: movimentacoes_produtos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.movimentacoes_produtos_id_seq OWNED BY public.movimentacoes_produtos.id;


--
-- Name: pagamentos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pagamentos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    venda_id uuid,
    data_pagamento date DEFAULT CURRENT_DATE,
    valor_pago numeric(10,2) DEFAULT 0,
    forma_pagamento text,
    observacao text,
    created_at timestamp without time zone DEFAULT now(),
    status text DEFAULT 'CONFIRMADO'::text,
    estornado_em timestamp with time zone,
    observacao_estorno text
);


--
-- Name: pagamentos_backup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pagamentos_backup (
    id uuid,
    venda_id uuid,
    data_pagamento date,
    valor_pago numeric(10,2),
    forma_pagamento text,
    observacao text,
    created_at timestamp without time zone
);


--
-- Name: pagamentos_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pagamentos_backup_20260523 (
    id uuid,
    venda_id uuid,
    data_pagamento date,
    valor_pago numeric(10,2),
    forma_pagamento text,
    observacao text,
    created_at timestamp without time zone,
    status text,
    estornado_em timestamp with time zone,
    observacao_estorno text
);


--
-- Name: pedidos_fornecedor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pedidos_fornecedor (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    produto_id uuid,
    produto_nome text,
    fornecedor text,
    quantidade numeric DEFAULT 1,
    custo numeric DEFAULT 0,
    venda numeric DEFAULT 0,
    margem numeric DEFAULT 0,
    markup numeric DEFAULT 0,
    observacao text,
    status text DEFAULT 'PENDENTE'::text,
    created_at timestamp with time zone DEFAULT now(),
    ultimo_custo numeric(10,2) DEFAULT 0,
    venda_atual numeric(10,2) DEFAULT 0,
    pedido_grupo_id uuid,
    salvo boolean DEFAULT false
);


--
-- Name: pedidos_fornecedor_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pedidos_fornecedor_backup_20260523 (
    id uuid,
    produto_id uuid,
    produto_nome text,
    fornecedor text,
    quantidade numeric,
    custo numeric,
    venda numeric,
    margem numeric,
    markup numeric,
    observacao text,
    status text,
    created_at timestamp with time zone,
    ultimo_custo numeric(10,2),
    venda_atual numeric(10,2),
    pedido_grupo_id uuid,
    salvo boolean
);


--
-- Name: pedidos_fornecedor_grupos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pedidos_fornecedor_grupos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    data_pedido timestamp without time zone DEFAULT now(),
    total_pecas integer DEFAULT 0,
    total_estimado numeric(10,2) DEFAULT 0,
    fornecedores text,
    status text DEFAULT 'ABERTO'::text,
    created_at timestamp without time zone DEFAULT now(),
    fornecedores_count integer DEFAULT 0,
    total_itens integer DEFAULT 0,
    observacao text
);


--
-- Name: pendencias; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pendencias (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    venda_id uuid,
    vencimento date,
    saldo_restante numeric(10,2) DEFAULT 0,
    status text DEFAULT 'PENDENTE'::text,
    dias_atraso integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    cliente_id uuid,
    origem text DEFAULT 'VENDA'::text,
    observacao_manual text
);


--
-- Name: pendencias_backup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pendencias_backup (
    id uuid,
    venda_id uuid,
    vencimento date,
    saldo_restante numeric(10,2),
    status text,
    dias_atraso integer,
    created_at timestamp without time zone
);


--
-- Name: pendencias_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pendencias_backup_20260523 (
    id uuid,
    venda_id uuid,
    vencimento date,
    saldo_restante numeric(10,2),
    status text,
    dias_atraso integer,
    created_at timestamp without time zone
);


--
-- Name: prevendas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prevendas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    cliente_nome text NOT NULL,
    referencia text,
    itens jsonb DEFAULT '[]'::jsonb NOT NULL,
    total numeric(12,2) DEFAULT 0,
    transcricao text,
    status text DEFAULT 'pendente'::text,
    mensagem_gerada boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    forma_pagamento text
);


--
-- Name: produtos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.produtos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nome text NOT NULL,
    fornecedor text,
    preco_custo numeric(10,2) DEFAULT 0,
    preco_venda numeric(10,2) DEFAULT 0,
    estoque integer DEFAULT 0,
    ativo boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    fornecedor_id bigint,
    preco_custo_anterior numeric
);


--
-- Name: produtos_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.produtos_backup_20260523 (
    id uuid,
    nome text,
    fornecedor text,
    preco_custo numeric(10,2),
    preco_venda numeric(10,2),
    estoque integer,
    ativo boolean,
    created_at timestamp without time zone,
    fornecedor_id bigint,
    preco_custo_anterior numeric
);


--
-- Name: roteiro_vendas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roteiro_vendas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    local text NOT NULL,
    tipo text DEFAULT 'Escola'::text,
    ultima_visita date,
    pecas_vendidas integer DEFAULT 0,
    observacao text,
    created_at timestamp with time zone DEFAULT now(),
    data_visita date
);


--
-- Name: roteiro_vendas_v2; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roteiro_vendas_v2 (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    local text NOT NULL,
    tipo text DEFAULT 'Escola'::text,
    data_visita date NOT NULL,
    pecas_vendidas integer DEFAULT 0,
    observacao text,
    created_at timestamp with time zone DEFAULT now(),
    categoria text DEFAULT 'LOCAL'::text,
    referencia text,
    horario text,
    concluido boolean DEFAULT false,
    ativo boolean DEFAULT true,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: taxas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.taxas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    forma_pagamento text NOT NULL,
    taxa_percentual numeric(10,2) DEFAULT 0,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: taxas_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.taxas_backup_20260523 (
    id uuid,
    forma_pagamento text,
    taxa_percentual numeric(10,2),
    created_at timestamp without time zone
);


--
-- Name: vendas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    numero_venda integer NOT NULL,
    cliente_id uuid,
    data_venda date DEFAULT CURRENT_DATE,
    valor_total numeric(10,2) DEFAULT 0,
    valor_liquido numeric(10,2) DEFAULT 0,
    forma_pagamento text,
    taxa_percentual numeric(10,2) DEFAULT 0,
    valor_taxa numeric(10,2) DEFAULT 0,
    status text DEFAULT 'EM ABERTO'::text,
    created_at timestamp without time zone DEFAULT now(),
    cliente_nome_avulso text
);


--
-- Name: vendas_backup; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendas_backup (
    id uuid,
    numero_venda integer,
    cliente_id uuid,
    data_venda date,
    valor_total numeric(10,2),
    valor_liquido numeric(10,2),
    forma_pagamento text,
    taxa_percentual numeric(10,2),
    valor_taxa numeric(10,2),
    status text,
    created_at timestamp without time zone
);


--
-- Name: vendas_backup_20260523; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vendas_backup_20260523 (
    id uuid,
    numero_venda integer,
    cliente_id uuid,
    data_venda date,
    valor_total numeric(10,2),
    valor_liquido numeric(10,2),
    forma_pagamento text,
    taxa_percentual numeric(10,2),
    valor_taxa numeric(10,2),
    status text,
    created_at timestamp without time zone
);


--
-- Name: vendas_numero_venda_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.vendas_numero_venda_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: vendas_numero_venda_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.vendas_numero_venda_seq OWNED BY public.vendas.numero_venda;


--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
)
PARTITION BY RANGE (inserted_at);


--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    action_filter text DEFAULT '*'::text,
    selected_columns text[],
    CONSTRAINT subscription_action_filter_check CHECK ((action_filter = ANY (ARRAY['*'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: -
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: -
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: objects; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: -
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb,
    metadata jsonb
);


--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: movimentacoes_produtos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movimentacoes_produtos ALTER COLUMN id SET DEFAULT nextval('public.movimentacoes_produtos_id_seq'::regclass);


--
-- Name: vendas numero_venda; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendas ALTER COLUMN numero_venda SET DEFAULT nextval('public.vendas_numero_venda_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.custom_oauth_providers (id, provider_type, identifier, name, client_id, client_secret, acceptable_client_ids, scopes, pkce_enabled, attribute_mapping, authorization_params, enabled, email_optional, issuer, discovery_url, skip_nonce_check, cached_discovery, discovery_cached_at, authorization_url, token_url, userinfo_url, jwks_uri, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at, invite_token, referrer, oauth_client_state_id, linking_target_id, email_optional) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type, token_endpoint_auth_method) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
20260219120000
20260302000000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.webauthn_challenges (id, user_id, challenge_type, session_data, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.webauthn_credentials (id, user_id, credential_id, public_key, attestation_type, aaguid, sign_count, transports, backup_eligible, backed_up, friendly_name, created_at, updated_at, last_used_at) FROM stdin;
\.


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.clientes (id, nome, referencia, telefone, observacoes, created_at, ativo, observacao) FROM stdin;
fe0c7fe5-87bd-4ccd-9a6c-2c48ad9f5a5e	Goretti	703 Norte | Bloco L	61999999999	\N	2026-05-10 00:15:18.370811	t	\N
b74f70cf-f808-4b6c-ac4e-55f639f33119	Fabiana Vilaça	Itaúna | Colégio Losango	5531998481151	\N	2026-05-10 14:43:45.719525	t	\N
a9e24e8e-2eb9-4ce8-a8ae-2bec251d21e5	Pedro	306 Norte	5561982267273	\N	2026-05-18 23:25:31.295461	t	Diretor
e21a833b-820f-43f0-b050-770259dbefb8	Carmosina 	EC 304 Norte	5561986159486	\N	2026-05-10 19:52:15.761187	t	\N
e33e4cd0-a716-4433-b747-ca1150c2da80	Lucas 	EC 304 Norte	5561982766793	\N	2026-05-10 19:53:11.217703	t	\N
6984057f-a825-4a88-a44c-f4544fb93477	Roberta Andrade 	EC 304 Norte	5561998234655	\N	2026-05-10 19:54:34.8802	t	\N
83bc3540-fab3-46e1-99aa-aea3c7d7aa76	Renata 	DCA	5561981033840	\N	2026-05-11 00:07:55.639048	t	\N
4d09a902-8f35-4d3e-a2f3-cc1cc259f7c1	Carol 	DCA		\N	2026-05-11 00:08:17.251122	t	\N
41bb3c82-020d-421e-826e-0ecb4709627c	Thelma	APAE	5561999775846	\N	2026-05-11 00:09:35.941656	t	\N
b71e719b-c5bd-4a76-bedd-98447770029b	Viviane 	CEDLAN	5561999784852	\N	2026-05-11 02:14:49.051841	t	\N
03e36432-3280-440a-b0ce-53ee68f4166c	Suêni 	CEDLAN	5561995693098	\N	2026-05-11 02:15:55.266698	t	\N
28e8e788-226f-439e-97d8-210c5c2bc097	Henrique 	CEDLAN	5561996706215	\N	2026-05-11 02:16:43.293051	t	\N
88de90f4-ed69-4d6a-8520-b49aaa847519	Jorge	CEDLAN	5561991333716	\N	2026-05-11 02:17:10.620096	t	\N
d7cc004f-5b0f-4dfd-8a21-e757565b9512	Cecília Dantas 	CEDLAN	5561981242401	\N	2026-05-11 02:18:05.135576	t	\N
8cd05d23-127e-4c3d-bdde-2986c9d95744	Isabella	CEDLAN-Diretora	5561981770144	\N	2026-05-11 02:18:44.312865	t	\N
ea5b82ce-75bf-4010-96f6-c979366eadbf	Suzana	CEAN	61999022789	\N	2026-05-11 14:50:53.164109	t	\N
61c4798c-e0b0-45ae-bc51-4f9e384bc178	Lilene 	Paulo Freire	556195337202	\N	2026-05-11 22:24:57.905289	t	\N
88abd703-7da7-4208-8517-8c93f4288aac	Rachel Melo	306 Norte	5561981991914	\N	2026-05-18 23:26:43.278974	t	
dcad2126-ab7f-4f45-903c-642941c75bdb	Kaise	EP 314 Sul	5561991775458	\N	2026-05-14 21:29:09.839636	t	\N
02118891-e850-4c23-bec7-765f04282b05	Silvio	EP 314 Sul	5561993249019	\N	2026-05-14 21:30:12.862212	t	\N
71eeb19b-9be0-4b78-befa-540470cffb0c	Rosa	306 Norte	5561991131829	\N	2026-05-18 23:27:31.23139	t	
ecc72255-02ab-4e25-b9b9-92d105b87a14	Zeila	306 Norte	5561996941279	\N	2026-05-18 23:28:56.975123	t	
42963653-1462-485d-a1a5-ca8832afac72	1 Cliente Avulso	Avulso		\N	2026-05-11 15:03:04.478736	t	\N
d3056b18-cfbe-4997-b323-72d647901178	Marineide	 CEAN	5561981784849	\N	2026-05-15 23:52:52.96027	t	\N
541616dd-53c2-433a-b9d0-a0b414f30014	Paulo 	CEAN	5561996832000	\N	2026-05-15 23:54:07.811773	t	\N
571f9e26-f977-4785-8824-70156cb777b0	Maria Lúcia	EP 210/211 Norte	5561996454256	\N	2026-05-16 00:15:45.779095	t	\N
e28a90ae-fdfc-4bf8-8a49-a953569e25c5	Rosângela	EP 210/211 Norte	5561991738940	\N	2026-05-10 00:16:55.573373	t	\N
3bb6ec2b-0b46-4ae2-84d2-ff95d7af0103	Carla 	306 Norte	5561999982284	\N	2026-05-16 00:51:43.729465	t	\N
013c7314-12b4-4631-ad1e-bd119a9ce7cb	Carlos	Objetivo	5561991767463	\N	2026-05-16 00:52:31.06448	t	\N
5218d663-d6a4-494c-9157-77ac26e69629	Nadila	Paulo Freire 	5561981698211	\N	2026-05-16 20:41:00.634741	t	\N
b4280181-1d59-425c-96ee-5f4808d46765	Patrícia	Paulo Freire	556198040172	\N	2026-05-16 20:42:20.353018	t	\N
04e10bcf-0b80-49ad-8a00-d9af4a455952	Cristiane Couto	306 Norte	5561996820716	\N	2026-05-18 23:30:32.154482	t	
e569ae1b-265b-4fdd-83c5-3065e30e3f75	João Pedro	CEAN	5561982230959	\N	2026-05-11 14:50:04.889022	t	
2935f91f-96ba-46f8-a030-e158181a0b0b	Milena	306 Norte	5561995649791	\N	2026-05-19 13:35:31.034078	t	
0b2814d1-fe8c-4d77-b0a4-3bbe3535dbd0	Lívia	306 Norte	5561981319093	\N	2026-05-19 20:10:16.142944	t	
d29586e8-6c89-433e-98db-f4da7b77b82f	Edna	Setor Oeste 	5561992527936	\N	2026-05-20 00:34:38.849039	t	Direção
dc7f62de-22bd-43ed-8b65-449403b44d6f	Cristiano	 EP 314 Sul	5561999668271	\N	2026-05-16 22:09:28.317908	t	\N
fb094592-c779-4046-89f7-f50c2174b4e0	Virna	EP 314 Sul	5561999572445	\N	2026-05-14 21:27:53.602422	t	\N
a4c2f8d9-96f8-44eb-b30e-8e34117920fa	Simone Lins	 Seb	5561996365339	\N	2026-05-16 22:11:20.360067	t	\N
42a31e31-eb48-4fb8-94f7-d93866663b29	Nath	Seb	5561984813554	\N	2026-05-16 22:13:52.635955	t	\N
1422293c-edb9-405c-9103-83311bcff646	Antônia	Seb	5561983665291	\N	2026-05-16 22:14:33.898876	t	\N
b1f9d073-9f0d-4a4a-8efb-e38d4edd46e1	Karla Sens	Seb	5561995502023	\N	2026-05-16 22:15:30.819973	t	\N
94842280-2699-4eb6-a4d4-345b116c5e66	Keitiane 	Paulo Freire	5561995435363	\N	2026-05-16 20:38:12.674707	t	Servidora
03a7d684-bb62-4042-881b-6fd70d6b1a92	Lúcia	Paulo Freire 	5561992746743	\N	2026-05-16 20:39:55.701917	t	Servidora
5f619fe7-3076-482c-b100-bc1e30f82aa4	Lilian	Seb	5561991662515	\N	2026-05-16 22:12:50.670669	t	Coordenadora
9fd43f47-77b1-4352-b6d9-caca865c9b31	Aline	Paulo Freire	5561992163646	\N	2026-05-16 20:44:01.567198	t	Vice Diretora
2ffbcaeb-0676-497f-a625-a809fab32a70	Fatima | Casa	Fatima | Casa	5561982073370	\N	2026-05-16 22:16:36.033599	t	
a89b680e-d7af-4473-b7ae-36cafa552e4f	Carla Sens	Seb	5561995502023	\N	2026-05-17 13:22:11.53206	t	
de57f20b-3f2b-4b0d-87ff-52299d620358	Mônica	Paulo Freire	5561994220700	\N	2026-05-16 20:43:11.643596	t	Servidora
dd1ec731-c383-4e80-97a1-0073b187f233	Ana Carolina	405 Norte	5561991932161	\N	2026-05-18 19:08:55.346823	t	 Souza
afb4cdb8-05c0-45d8-a16c-69038d0324d4	Elaine 	405 Norte	5561991373159	\N	2026-05-18 19:10:06.380078	t	
c0aa151d-0aba-4c9a-bc6d-520971eb8f65	Ana Paula	306 Norte	5561992849200	\N	2026-05-18 23:21:36.990316	t	
42265198-db47-4a91-b891-43e3184adb6d	Fábio	306 Norte	556198164210	\N	2026-05-18 23:22:45.318942	t	
c604d014-cf0f-42ab-85bd-6ff27519d412	Guilherme	306 Norte	5561981406666	\N	2026-05-18 23:23:54.428533	t	
0960c594-7067-48c8-b330-49ba276270d9	Patrícia	306 Norte	556181745538	\N	2026-05-18 23:24:52.358064	t	
8a763d8f-9b41-4397-a224-815c9b2110e5	Gabriel	Setor Oeste	5561981196823	\N	2026-05-20 00:35:29.792379	t	
c19b339d-ce7a-4e00-8213-8030892de285	Glauco	Setor Oeste	5561996295420	\N	2026-05-20 00:36:08.14889	t	
0f18dd99-28bb-4fd4-b527-297af713423c	Grace	Setor Oeste	5561991939842	\N	2026-05-20 00:36:41.703552	t	
bd6b01b7-9ef8-4cac-882d-d68ace666140	Kerlene	Setor Oeste	5561981566784	\N	2026-05-20 00:37:26.486685	t	
12b03c8f-3695-47a2-966b-1885fa5a1bad	Lucas	Setor Oeste	5561999517030	\N	2026-05-20 00:38:22.521574	t	
8b9ba93c-f661-4bcf-bb74-fc37fb03bb30	Paloma	Setor Oeste	5561991450505	\N	2026-05-20 00:39:22.018619	t	
ec45b1e8-f079-4e80-a27c-ce450048f057	Wilma	114 Sul	5561996351717	\N	2026-05-20 00:43:26.821553	t	
452918e9-1f0b-4975-a361-581bc1efd985	Dani	EP 210 Sul	5561992924482	\N	2026-05-20 00:45:49.180964	t	
1eba3762-4e1d-4ca8-89d1-733dfbe999b0	Estefânia	EP 210 Sul	5561984744789	\N	2026-05-20 00:46:42.03918	t	
4b9b4015-1e0c-4a6d-a17b-c59ab3bbda7a	Fabiana	EP 210 Sul	5561995174601	\N	2026-05-20 00:47:44.183433	t	
3540ba6d-b830-4e8d-887b-5de9b1d28ddb	Roberto	EP 210 Sul 	5561992144601	\N	2026-05-20 00:49:46.486673	t	Diretor
66b92731-a181-43ba-919b-ad7c43b4a459	Rose	EP 210 Sul	5561992490265	\N	2026-05-20 00:50:32.529999	t	
2b7e4247-40cf-436e-bdc3-9ee9568e2d51	Nívea	EP 210 Sul	5561998056373	\N	2026-05-20 00:52:18.803408	t	
1b80b528-1ede-49b3-a1ad-857e15b5e5a8	Daniel	Contato	5561984802445	\N	2026-05-20 00:53:33.491051	t	
9d9acf30-6850-4e91-b19d-cd9041067e8f	Elias	Contato	5561998702770	\N	2026-05-20 00:54:11.934807	t	
cb16ce15-8db3-4b02-975c-56d6dc70803b	Jô	Contato 	556192273205	\N	2026-05-20 00:55:02.407799	t	
44669645-446f-4181-87d8-c6158edb7223	Andréa	CHPP	5516999330931	\N	2026-05-22 01:23:09.052172	t	
0885094a-f102-4c5b-a762-907afba38a00	Silvia	CHPP	5561981302288	\N	2026-05-22 01:24:04.112009	t	
634cdd70-7737-47d3-af78-c9c88e309382	André	CHPP	5561981707272	\N	2026-05-22 01:25:00.164431	t	
69a6f172-2aa9-44ba-a675-6b34e1ad5761	Raimunda	CHPP	5561996256620	\N	2026-05-22 01:25:50.561584	t	Servidora 
298c98d7-a412-4fb3-8f48-a026a12ebfdf	Delber Vilaça	Brasília - DF	5561993020000	\N	2026-05-10 14:07:57.126258	t	\N
310507da-d7b8-4d78-9975-2a453a6b342d	Márcio	CEAN	5561991585366	\N	2026-05-24 14:58:49.297959	t	
c112d87b-95ee-46ab-927f-b49d5e92cdae	Luan	CHPP	5517981271300	\N	2026-05-25 11:23:39.115695	t	
fca883c0-51e4-4a5a-a8d9-ae27fac505af	Jane 	EC 314 Sul	5561998451093	\N	2026-05-21 16:54:53.625141	t	Escola Classe
1bfbc117-2957-4831-a143-f7c81660c219	Mira	CEF 410 Norte	5561982509131	\N	2026-05-10 00:16:29.030949	t	
a1f0673a-4e6a-4c26-9498-62a1087402bf	Ana Silvia	EC 304 Norte	5561984029228	\N	2026-05-10 00:15:57.946287	t	
ee8b660a-bba9-4a48-b4c7-1ab89f596da1	Lucilena	EC 114 Sul	5561999143213	\N	2026-05-20 00:42:26.66417	t	
f84c76c9-38b4-4c78-a5bf-02a8e416210c	Patrícia	Objetivo | Coordenadora	5561996749181	\N	2026-05-25 11:46:42.110785	t	Coordenadora
34567cb1-6bba-4da8-a8b8-e94ab65f41a7	Fernanda	403 Norte	5561992327070	\N	2026-05-25 19:01:31.049561	t	
0573af41-d3e7-4fdc-848e-57929d11f148	Vanessa 	Lima | CESAS	5561982083969	\N	2026-05-27 20:44:08.483706	t	SQS 104  Bloco K  Apt 602
a906591e-816a-4d12-b087-c188019af2bc	Isabela	EP 304 Norte	5561982336204	\N	2026-05-27 22:25:09.908849	t	
82df9d97-c476-43cf-a0ef-01fbbc961281	Giovanna	EP 304 Norte	5561994067061	\N	2026-05-27 22:25:48.856332	t	
c89fe789-ee32-4f4f-a723-eae8fe2f638a	Joaquim	EP 304 Norte	5561981217477	\N	2026-05-27 22:26:35.148564	t	
a31777c4-afd6-4eee-b834-615dc3db7e68	Fernanda	EP 304 Norte 	5561999588874	\N	2026-05-27 22:27:30.833242	t	Coordenadora
a59e40c3-de6d-4727-9c88-3ab2d03f8123	Sônia	EP 304 Norte	556182355933	\N	2026-05-27 22:28:11.165216	t	
bb236a78-1258-486b-bf0e-4cf99c89f5ac	Bárbara Ramalho	EP 304 Norte	5561992777408	\N	2026-05-27 22:49:54.426422	t	
584bc3fe-a098-4e75-b6a0-3b3c32a910d4	Shirley	403 Norte	5561996472900	\N	2026-05-27 23:07:48.234474	t	Diretora
5920ebf4-61c2-435b-82c6-e0dca4a155ed	Josiane	403 Norte	5561992992874	\N	2026-05-27 23:08:29.369496	t	
aa86da8e-5bcf-41c1-b3ff-dc75f5f3b771	Michelle	403 Norte	5561999770721	\N	2026-05-27 23:09:22.021447	t	
d308890d-42e3-48fa-b014-83373eec2028	Jeferson	Objetivo	5561992656798	\N	2026-05-28 19:44:32.170802	t	
65622ed6-75f4-4a8b-88bd-1dbb13bd995b	Tânia	Objetivo	5561992255882	\N	2026-05-28 19:47:08.589198	t	
cb624ad1-f05a-4792-b716-0e577ba7980f	Ladiana	Objetivo	5561986798305	\N	2026-05-28 19:47:50.210263	t	
a8497b38-5b49-4653-a339-9234f1907547	Sabrina	Objetivo	5561996059130	\N	2026-05-28 19:48:26.572687	t	
7a39a9a6-14a1-41c8-bdcf-cbcbf00d48fd	Gleice	Objetivo	5561991144488	\N	2026-05-28 19:49:05.508149	t	
068a5677-4ea4-471c-99bf-86cb2b10c099	Sandra Falcão	EP 304 Norte	5577991192801	\N	2026-05-28 19:58:25.742528	t	
7ba4fd16-b827-44f7-ae3e-9e084e9ae94c	Camila	Objetivo		\N	2026-05-28 20:29:49.15769	t	
aeb0b792-f9c5-4472-b9b2-3526e11c5b15	Morena	GAN	5561992070717	\N	2026-05-29 19:43:57.832445	t	Servidora 
11f16b01-448a-4159-9e6e-60e624a62f68	Edriana 	GAN	5561998118874	\N	2026-05-29 19:44:50.373715	t	
62d50c3f-7f30-41c6-a97c-f9e294521ae9	Diceu	GAN	5561995987397	\N	2026-05-29 19:45:38.271889	t	Diretor
30b263cf-3a92-486b-88d1-9c13188e26eb	Edna 	GAN	5561981670375	\N	2026-05-29 19:46:58.090354	t	Orientadora
33c9fdda-ca62-410a-8318-f436785a9e28	João Vitor Vilaça	Itaúna	5537984111300	\N	2026-05-29 22:18:46.1232	t	Jhonvill
0868576b-90a9-4c3e-9ee0-f337995b072d	Dr. Wilson Pires	DECOR	5561982660148	\N	2026-05-30 14:19:27.620255	t	
80d1408f-e1e8-4ae5-9e99-7b88ab0ea20c	Cristiane Alves	EC 113 Norte	5561981433396	\N	2026-06-04 22:17:21.895853	t	Pagamento todo dia 15
59130896-1c0e-45e0-a449-01381ad008e8	Cíntia Oliveira	EC 113 Norte	12028084343	\N	2026-06-04 22:18:37.246051	t	
e21e1f7e-c755-4343-af89-3a3677a62762	Sem Cadastro / Contato			\N	2026-06-04 22:39:58.983888	t	
21f05c24-083e-4d83-b0a7-ae1701618392	Júlio	EP 210 Sul	5561999977017	\N	2026-06-04 22:44:51.245183	t	
5128a772-249f-4d06-ac54-d40499f7a007	Cristielle	EC 113 Norte	5561992005191	\N	2026-06-04 23:03:06.873253	t	
0b2bac73-9bb7-4ea6-a951-d39be97aeb58	Raiane	EC 114 Sul	5561982956254	\N	2026-06-04 23:19:50.323264	t	
3995067f-4df0-4f26-bf28-a55af8a1f896	Kelly	EC 114 Sul	5561995189410	\N	2026-06-04 23:20:44.142398	t	
00d3c7a5-53d6-4ea3-a907-b93fcc8ccc61	Silene	EC 114 Sul	5561981778152	\N	2026-06-04 23:21:54.649733	t	
0e0af691-400e-48f5-a7fb-5933008f1a01	Luísa	EC 114 Sul	5561981191989	\N	2026-06-04 23:30:18.998945	t	
6975aa8e-1f02-4e65-bf16-bcca420e20a6	Café	CORF	5561981160550	\N	2026-06-05 02:17:48.319908	t	
669251c3-b19e-4c19-9238-3960b5cdddac	Matheus	CHPP	5561981118047	\N	2026-06-05 23:00:44.185176	t	
27d44823-4c0e-4ce1-bcc5-3f825f125ce2	Ângela	CEAN	5561981620429	\N	2026-06-09 21:11:17.448897	t	
9d234a1c-7cd8-4952-bc08-f41900e7e783	Anelisa	CEAN	5561991082131	\N	2026-06-09 21:12:13.044844	t	
651dbbcf-fa79-4ad6-aa90-ae6b39fd6f3d	Henrique	CEAN	5561986366734	\N	2026-06-09 21:13:16.453526	t	
589a0083-ed52-4bb8-ab03-d3363bd22566	Fernanda	EC 113 Norte	5561981436072	\N	2026-06-09 21:14:11.799894	t	
14445c7a-dee6-4e1b-b0dc-fbb6b5b97a99	Regina	CEAN	5561992713122	\N	2026-06-09 21:15:58.079739	t	
70ae3c45-ccec-4145-b588-0c6e0ba31e98	Ane	Paulo Freire	5561983482962	\N	2026-06-10 20:04:10.33534	t	
a470062a-b031-456a-a6c8-57a6278c3934	Brenda	Paulo Freire - Servidora	5561995973762	\N	2026-06-10 20:05:14.443071	t	
9d78b5f3-a8f1-4ef3-a4b9-905d1a270ab7	Leonardo	Paulo Freire	5561982263865	\N	2026-06-10 20:05:55.827154	t	
b303d8f1-92a4-4e87-84ea-7e517650b50d	Greice	Paulo Freire - Servidora	5561981008855	\N	2026-06-10 20:06:37.901568	t	
f8d97e97-cac7-403b-83e0-bdb73d51735c	Cláudia Soares	Paulo Freire - Servidora	5561991450563	\N	2026-06-10 20:07:24.058061	t	
01ac627c-7cf7-4e09-8a32-f1ed9edd45f2	Wellington	Seb	5561995817496	\N	2026-06-13 23:04:20.882433	t	Servidor
89b2ac7b-7d17-440a-bfd5-742628eecb70	Kika	Ministério do Desenv. MDIC	561992523511	\N	2026-06-16 20:51:14.661957	t	
1cd96dff-cbed-4d45-9b2d-3dc0a1020b18	Isabella	CEDLAN	5561981770144	\N	2026-06-16 19:43:21.730594	f	
a4053193-1f29-4682-8db3-b1ae8883e829	Ruth	EC 405 Norte	5561993782740	\N	2026-06-17 22:55:11.7115	t	
54b21d33-7c14-4bc9-b89d-43a0b25caaac	Mônica	EC 405 Norte	5561981262483	\N	2026-06-17 22:56:03.748502	t	
09353ced-354f-4c18-ae4d-973c22d74c62	Elaine	EC 405 Norte	5561991373159	\N	2026-06-17 22:56:55.348846	t	
482b85bf-c598-4d91-b64e-97c09cfb7bd9	Iara	EC 405 Norte	5561991841527	\N	2026-06-17 22:58:16.586246	t	
de541209-602b-47af-8ede-c508e1dd7860	Kênia	EC 405 Norte	5561996043208	\N	2026-06-17 22:59:04.513465	t	
0c8d783d-5aea-4277-a7d2-bb88f59952bb	Kênia	405 Norte	5561996043208	\N	2026-05-18 13:53:33.056999	f	
c1f823a4-ccc5-4be3-a14e-52f19d73d6da	Aline Salomão	EP 314 Sul	5561991033311	\N	2026-06-18 22:07:49.68802	t	
0ea43ae6-06df-4655-b547-2af2341ff80c	Joana Santana	EP 314 Sul	5561981118462	\N	2026-06-18 22:09:48.875836	t	
ce828fa9-7664-47af-896b-e82a9a0cd113	Arthur	EP 314 Sul	5561993968679	\N	2026-06-18 22:10:43.12807	t	
\.


--
-- Data for Name: clientes_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.clientes_backup_20260523 (id, nome, referencia, telefone, observacoes, created_at, ativo, observacao) FROM stdin;
a1f0673a-4e6a-4c26-9498-62a1087402bf	Ana Silvia\n	EC 304 Norte\n	61988888888	\N	2026-05-10 00:15:57.946287	t	\N
1bfbc117-2957-4831-a143-f7c81660c219	Mira\n	CEF 410 Norte\n	61977777777	\N	2026-05-10 00:16:29.030949	t	\N
fe0c7fe5-87bd-4ccd-9a6c-2c48ad9f5a5e	Goretti	703 Norte | Bloco L	61999999999	\N	2026-05-10 00:15:18.370811	t	\N
298c98d7-a412-4fb3-8f48-a026a12ebfdf	Delber Vilaça	Brasília - DF	5561993020000	\N	2026-05-10 14:07:57.126258	t	\N
b74f70cf-f808-4b6c-ac4e-55f639f33119	Fabiana Vilaça	Itaúna | Colégio Losango	5531998481151	\N	2026-05-10 14:43:45.719525	t	\N
a9e24e8e-2eb9-4ce8-a8ae-2bec251d21e5	Pedro	306 Norte	5561982267273	\N	2026-05-18 23:25:31.295461	t	Diretor
e21a833b-820f-43f0-b050-770259dbefb8	Carmosina 	EC 304 Norte	5561986159486	\N	2026-05-10 19:52:15.761187	t	\N
e33e4cd0-a716-4433-b747-ca1150c2da80	Lucas 	EC 304 Norte	5561982766793	\N	2026-05-10 19:53:11.217703	t	\N
6984057f-a825-4a88-a44c-f4544fb93477	Roberta Andrade 	EC 304 Norte	5561998234655	\N	2026-05-10 19:54:34.8802	t	\N
83bc3540-fab3-46e1-99aa-aea3c7d7aa76	Renata 	DCA	5561981033840	\N	2026-05-11 00:07:55.639048	t	\N
4d09a902-8f35-4d3e-a2f3-cc1cc259f7c1	Carol 	DCA		\N	2026-05-11 00:08:17.251122	t	\N
41bb3c82-020d-421e-826e-0ecb4709627c	Thelma	APAE	5561999775846	\N	2026-05-11 00:09:35.941656	t	\N
b71e719b-c5bd-4a76-bedd-98447770029b	Viviane 	CEDLAN	5561999784852	\N	2026-05-11 02:14:49.051841	t	\N
03e36432-3280-440a-b0ce-53ee68f4166c	Suêni 	CEDLAN	5561995693098	\N	2026-05-11 02:15:55.266698	t	\N
28e8e788-226f-439e-97d8-210c5c2bc097	Henrique 	CEDLAN	5561996706215	\N	2026-05-11 02:16:43.293051	t	\N
88de90f4-ed69-4d6a-8520-b49aaa847519	Jorge	CEDLAN	5561991333716	\N	2026-05-11 02:17:10.620096	t	\N
d7cc004f-5b0f-4dfd-8a21-e757565b9512	Cecília Dantas 	CEDLAN	5561981242401	\N	2026-05-11 02:18:05.135576	t	\N
8cd05d23-127e-4c3d-bdde-2986c9d95744	Isabella	CEDLAN-Diretora	5561981770144	\N	2026-05-11 02:18:44.312865	t	\N
ea5b82ce-75bf-4010-96f6-c979366eadbf	Suzana	CEAN	61999022789	\N	2026-05-11 14:50:53.164109	t	\N
61c4798c-e0b0-45ae-bc51-4f9e384bc178	Lilene 	Paulo Freire	556195337202	\N	2026-05-11 22:24:57.905289	t	\N
88abd703-7da7-4208-8517-8c93f4288aac	Rachel Melo	306 Norte	5561981991914	\N	2026-05-18 23:26:43.278974	t	
dcad2126-ab7f-4f45-903c-642941c75bdb	Kaise	EP 314 Sul	5561991775458	\N	2026-05-14 21:29:09.839636	t	\N
02118891-e850-4c23-bec7-765f04282b05	Silvio	EP 314 Sul	5561993249019	\N	2026-05-14 21:30:12.862212	t	\N
71eeb19b-9be0-4b78-befa-540470cffb0c	Rosa	306 Norte	5561991131829	\N	2026-05-18 23:27:31.23139	t	
ecc72255-02ab-4e25-b9b9-92d105b87a14	Zeila	306 Norte	5561996941279	\N	2026-05-18 23:28:56.975123	t	
42963653-1462-485d-a1a5-ca8832afac72	1 Cliente Avulso	Avulso		\N	2026-05-11 15:03:04.478736	t	\N
d3056b18-cfbe-4997-b323-72d647901178	Marineide	 CEAN	5561981784849	\N	2026-05-15 23:52:52.96027	t	\N
541616dd-53c2-433a-b9d0-a0b414f30014	Paulo 	CEAN	5561996832000	\N	2026-05-15 23:54:07.811773	t	\N
571f9e26-f977-4785-8824-70156cb777b0	Maria Lúcia	EP 210/211 Norte	5561996454256	\N	2026-05-16 00:15:45.779095	t	\N
e28a90ae-fdfc-4bf8-8a49-a953569e25c5	Rosângela	EP 210/211 Norte	5561991738940	\N	2026-05-10 00:16:55.573373	t	\N
3bb6ec2b-0b46-4ae2-84d2-ff95d7af0103	Carla 	306 Norte	5561999982284	\N	2026-05-16 00:51:43.729465	t	\N
013c7314-12b4-4631-ad1e-bd119a9ce7cb	Carlos	Objetivo	5561991767463	\N	2026-05-16 00:52:31.06448	t	\N
5218d663-d6a4-494c-9157-77ac26e69629	Nadila	Paulo Freire 	5561981698211	\N	2026-05-16 20:41:00.634741	t	\N
b4280181-1d59-425c-96ee-5f4808d46765	Patrícia	Paulo Freire	556198040172	\N	2026-05-16 20:42:20.353018	t	\N
04e10bcf-0b80-49ad-8a00-d9af4a455952	Cristiane Couto	306 Norte	5561996820716	\N	2026-05-18 23:30:32.154482	t	
e569ae1b-265b-4fdd-83c5-3065e30e3f75	João Pedro	CEAN	5561982230959	\N	2026-05-11 14:50:04.889022	t	
2935f91f-96ba-46f8-a030-e158181a0b0b	Milena	306 Norte	5561995649791	\N	2026-05-19 13:35:31.034078	t	
0b2814d1-fe8c-4d77-b0a4-3bbe3535dbd0	Lívia	306 Norte	5561981319093	\N	2026-05-19 20:10:16.142944	t	
d29586e8-6c89-433e-98db-f4da7b77b82f	Edna	Setor Oeste 	5561992527936	\N	2026-05-20 00:34:38.849039	t	Direção
dc7f62de-22bd-43ed-8b65-449403b44d6f	Cristiano	 EP 314 Sul	5561999668271	\N	2026-05-16 22:09:28.317908	t	\N
fb094592-c779-4046-89f7-f50c2174b4e0	Virna	EP 314 Sul	5561999572445	\N	2026-05-14 21:27:53.602422	t	\N
a4c2f8d9-96f8-44eb-b30e-8e34117920fa	Simone Lins	 Seb	5561996365339	\N	2026-05-16 22:11:20.360067	t	\N
42a31e31-eb48-4fb8-94f7-d93866663b29	Nath	Seb	5561984813554	\N	2026-05-16 22:13:52.635955	t	\N
1422293c-edb9-405c-9103-83311bcff646	Antônia	Seb	5561983665291	\N	2026-05-16 22:14:33.898876	t	\N
b1f9d073-9f0d-4a4a-8efb-e38d4edd46e1	Karla Sens	Seb	5561995502023	\N	2026-05-16 22:15:30.819973	t	\N
94842280-2699-4eb6-a4d4-345b116c5e66	Keitiane 	Paulo Freire	5561995435363	\N	2026-05-16 20:38:12.674707	t	Servidora
03a7d684-bb62-4042-881b-6fd70d6b1a92	Lúcia	Paulo Freire 	5561992746743	\N	2026-05-16 20:39:55.701917	t	Servidora
5f619fe7-3076-482c-b100-bc1e30f82aa4	Lilian	Seb	5561991662515	\N	2026-05-16 22:12:50.670669	t	Coordenadora
9fd43f47-77b1-4352-b6d9-caca865c9b31	Aline	Paulo Freire	5561992163646	\N	2026-05-16 20:44:01.567198	t	Vice Diretora
2ffbcaeb-0676-497f-a625-a809fab32a70	Fatima | Casa	Fatima | Casa	5561982073370	\N	2026-05-16 22:16:36.033599	t	
a89b680e-d7af-4473-b7ae-36cafa552e4f	Carla Sens	Seb	5561995502023	\N	2026-05-17 13:22:11.53206	t	
de57f20b-3f2b-4b0d-87ff-52299d620358	Mônica	Paulo Freire	5561994220700	\N	2026-05-16 20:43:11.643596	t	Servidora
0c8d783d-5aea-4277-a7d2-bb88f59952bb	Kênia	405 Norte	5561996043208	\N	2026-05-18 13:53:33.056999	t	
dd1ec731-c383-4e80-97a1-0073b187f233	Ana Carolina	405 Norte	5561991932161	\N	2026-05-18 19:08:55.346823	t	 Souza
afb4cdb8-05c0-45d8-a16c-69038d0324d4	Elaine 	405 Norte	5561991373159	\N	2026-05-18 19:10:06.380078	t	
c0aa151d-0aba-4c9a-bc6d-520971eb8f65	Ana Paula	306 Norte	5561992849200	\N	2026-05-18 23:21:36.990316	t	
42265198-db47-4a91-b891-43e3184adb6d	Fábio	306 Norte	556198164210	\N	2026-05-18 23:22:45.318942	t	
c604d014-cf0f-42ab-85bd-6ff27519d412	Guilherme	306 Norte	5561981406666	\N	2026-05-18 23:23:54.428533	t	
0960c594-7067-48c8-b330-49ba276270d9	Patrícia	306 Norte	556181745538	\N	2026-05-18 23:24:52.358064	t	
8a763d8f-9b41-4397-a224-815c9b2110e5	Gabriel	Setor Oeste	5561981196823	\N	2026-05-20 00:35:29.792379	t	
c19b339d-ce7a-4e00-8213-8030892de285	Glauco	Setor Oeste	5561996295420	\N	2026-05-20 00:36:08.14889	t	
0f18dd99-28bb-4fd4-b527-297af713423c	Grace	Setor Oeste	5561991939842	\N	2026-05-20 00:36:41.703552	t	
bd6b01b7-9ef8-4cac-882d-d68ace666140	Kerlene	Setor Oeste	5561981566784	\N	2026-05-20 00:37:26.486685	t	
12b03c8f-3695-47a2-966b-1885fa5a1bad	Lucas	Setor Oeste	5561999517030	\N	2026-05-20 00:38:22.521574	t	
8b9ba93c-f661-4bcf-bb74-fc37fb03bb30	Paloma	Setor Oeste	5561991450505	\N	2026-05-20 00:39:22.018619	t	
ee8b660a-bba9-4a48-b4c7-1ab89f596da1	Lucilena	114 Sul	5561999143213	\N	2026-05-20 00:42:26.66417	t	
ec45b1e8-f079-4e80-a27c-ce450048f057	Wilma	114 Sul	5561996351717	\N	2026-05-20 00:43:26.821553	t	
452918e9-1f0b-4975-a361-581bc1efd985	Dani	EP 210 Sul	5561992924482	\N	2026-05-20 00:45:49.180964	t	
1eba3762-4e1d-4ca8-89d1-733dfbe999b0	Estefânia	EP 210 Sul	5561984744789	\N	2026-05-20 00:46:42.03918	t	
4b9b4015-1e0c-4a6d-a17b-c59ab3bbda7a	Fabiana	EP 210 Sul	5561995174601	\N	2026-05-20 00:47:44.183433	t	
3540ba6d-b830-4e8d-887b-5de9b1d28ddb	Roberto	EP 210 Sul 	5561992144601	\N	2026-05-20 00:49:46.486673	t	Diretor
66b92731-a181-43ba-919b-ad7c43b4a459	Rose	EP 210 Sul	5561992490265	\N	2026-05-20 00:50:32.529999	t	
2b7e4247-40cf-436e-bdc3-9ee9568e2d51	Nívea	EP 210 Sul	5561998056373	\N	2026-05-20 00:52:18.803408	t	
1b80b528-1ede-49b3-a1ad-857e15b5e5a8	Daniel	Contato	5561984802445	\N	2026-05-20 00:53:33.491051	t	
9d9acf30-6850-4e91-b19d-cd9041067e8f	Elias	Contato	5561998702770	\N	2026-05-20 00:54:11.934807	t	
cb16ce15-8db3-4b02-975c-56d6dc70803b	Jô	Contato 	556192273205	\N	2026-05-20 00:55:02.407799	t	
fca883c0-51e4-4a5a-a8d9-ae27fac505af	Jane Oliveira	314 Sul	5561998451093	\N	2026-05-21 16:54:53.625141	t	Escola Classe
44669645-446f-4181-87d8-c6158edb7223	Andréa	CHPP	5516999330931	\N	2026-05-22 01:23:09.052172	t	
0885094a-f102-4c5b-a762-907afba38a00	Silvia	CHPP	5561981302288	\N	2026-05-22 01:24:04.112009	t	
634cdd70-7737-47d3-af78-c9c88e309382	André	CHPP	5561981707272	\N	2026-05-22 01:25:00.164431	t	
69a6f172-2aa9-44ba-a675-6b34e1ad5761	Raimunda	CHPP	5561996256620	\N	2026-05-22 01:25:50.561584	t	Servidora 
\.


--
-- Data for Name: delivery; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery (id, venda_id, data_pedido, data_entrega, cliente_id, referencia, local_entrega, descricao, valor_total, status, created_at, data_confirmacao_entrega) FROM stdin;
17	0996977b-d01b-4989-ae17-f51073ac7b0f	2026-05-25	2026-05-28	f84c76c9-38b4-4c78-a5bf-02a8e416210c	Objetivo	\N	01 Vinagrete Jiló\n01 Vinagrete Pimenta\n01 Zero Lactose\n01 Fazenda diet	187.00	Entregue	2026-05-25 11:48:17.819602+00	2026-05-28
19	208ec073-7f1a-4a25-bbb2-55143bd0a598	2026-05-27	2026-06-03	41bb3c82-020d-421e-826e-0ecb4709627c	APAE	\N	O1 lombinho tradicional | R$ 49,00	49.00	Entregue	2026-05-27 16:49:12.66486+00	2026-06-04
49	\N	2026-06-18	2026-06-26	482b85bf-c598-4d91-b64e-97c09cfb7bd9	EC 405 Norte	EC 405 Norte	\nItens: Lançados\n02 Palitos Zero Lactose • R$ 59,00 und. • Total R$ 118,00\n	118.00	Programado	2026-06-18 22:24:45.983037+00	\N
4	44eee381-2015-46b6-9ad5-9df7e9cb620a	2026-05-15	2026-05-26	3bb6ec2b-0b46-4ae2-84d2-ff95d7af0103	306 Norte	Escola	01 Cocada Cremosa Tradicional	49.00	Entregue	2026-05-16 00:48:54.607932+00	2026-05-26
12	e97b26e2-a5f2-4c1e-a63b-5971c081f20c	2026-05-19	2026-05-26	c0aa151d-0aba-4c9a-bc6d-520971eb8f65	306 Norte	\N	02 Rosquinha de Nata c/ Goiabada	80.00	Entregue	2026-05-19 20:17:38.593583+00	2026-05-26
11	3d91a855-7ac7-4320-ba75-d4452eb4d6b9	2026-05-19	2026-05-26	04e10bcf-0b80-49ad-8a00-d9af4a455952	306 Norte	\N	01 Rosquinha de Nata c/ Goiabada\n01 Tropical pedaço	75.00	Entregue	2026-05-19 20:16:52.639289+00	2026-05-26
10	ddfea1c7-ec24-4191-aac4-fc2b317c88ed	2026-05-19	2026-05-26	42265198-db47-4a91-b891-43e3184adb6d	306 Norte	\N	01 Desidratado goiabada\n01 Via Lat	119.00	Entregue	2026-05-19 20:16:14.891794+00	2026-05-26
9	7785fd56-6559-4658-8c4d-48e6c463d173	2026-05-19	2026-05-26	c604d014-cf0f-42ab-85bd-6ff27519d412	306 Norte	\N	01 Mix	50.00	Entregue	2026-05-19 20:15:34.195438+00	2026-05-26
15	a8f03b27-b9f6-46ef-a603-5db891ff0d5b	2026-05-21	2026-05-26	fca883c0-51e4-4a5a-a8d9-ae27fac505af	314 Sul	314 Sul	05 Talharim \n01 Via Lat	179.00	Entregue	2026-05-21 16:56:09.936604+00	2026-05-26
50	\N	2026-06-19	2026-06-30	94842280-2699-4eb6-a4d4-345b116c5e66	Paulo Freire	Paulo Freire	\nItens:\n01 Cocada Cremosa Tradicional 	49.00	Programado	2026-06-19 18:50:04.055591+00	\N
25	f729efa3-4ad5-42a1-bf78-0e57d27ad706	2026-05-28	2026-05-28	298c98d7-a412-4fb3-8f48-a026a12ebfdf	Brasília - DF	\N	\N	0.01	Entregue	2026-05-29 02:30:47.854156+00	2026-05-29
14	14e54650-23c1-45c0-8764-6bd5894d2bf8	2026-05-20	2026-05-26	bd6b01b7-9ef8-4cac-882d-d68ace666140	Setor Oeste	\N	01 Vale da Canastra 2Lts	90.00	Entregue	2026-05-20 19:56:33.032977+00	2026-05-26
13	d72b87b9-a0a8-4ab4-8bbf-ddcf5c0e1204	2026-05-20	2026-05-26	d29586e8-6c89-433e-98db-f4da7b77b82f	Setor Oeste 	\N	02 Desidratado goiabada	80.00	Entregue	2026-05-20 19:55:58.102028+00	2026-05-26
26	93020737-b180-4727-8761-e999475bf13e	2026-05-28	2026-05-28	298c98d7-a412-4fb3-8f48-a026a12ebfdf	Brasília - DF	\N	\N	0.01	Entregue	2026-05-29 02:38:34.815189+00	2026-05-29
22	\N	2026-05-28	2026-06-18	d308890d-42e3-48fa-b014-83373eec2028	Objetivo	\N	01 Provolone com Picanha\n01 Uai - Damasco | R$ 99,00	91.00	Programado	2026-05-28 19:46:17.423949+00	\N
18	19951426-4292-458a-bc6c-b5b2fd05c180	2026-05-25	2026-05-27	34567cb1-6bba-4da8-a8b8-e94ab65f41a7	403 Norte	\N	01 Vale da canastra Pink\n01 Vale da canastra 2Lts\n02 Palito Trad.\n01 Desidratado goiabada\n02 Requeijão com Raspas\n01 Kit Lombinho	555.00	Entregue	2026-05-25 19:03:53.787519+00	2026-05-27
27	d29e594c-bc57-4c5b-a022-b4ff19e00990	2026-05-29	2026-05-29	298c98d7-a412-4fb3-8f48-a026a12ebfdf	Brasília - DF	\N	\N	0.01	Entregue	2026-05-29 19:39:38.115758+00	2026-05-29
43	\N	2026-06-15	2026-06-22	e28a90ae-fdfc-4bf8-8a49-a953569e25c5	EP 210/211 Norte	\N	Falta Lançar\n01 Cocada Cremosa • R$ 49,00 \n01 Mocotó • R$ 39,00  \n01 Vila Caipira • R$ 79,00 	167.00	Programado	2026-06-16 01:13:21.663881+00	\N
31	8331ca3e-cfad-45cb-827f-37811276c1a5	2026-05-30	2026-05-31	42963653-1462-485d-a1a5-ca8832afac72	Avulso	Brasil	Cimento | R$ 0,01\nAreia | R$ 0,01	0.02	Entregue	2026-05-30 19:57:22.198737+00	2026-05-30
30	cab44748-0f98-441b-80d2-090e84bc6bba	2026-05-30	2026-05-31	42963653-1462-485d-a1a5-ca8832afac72	Avulso	\N	01 Maracujá | R$ 0,01\n01 Limão | R$ 0,01\n01 Manga | R$ 0,01	0.07	Entregue	2026-05-30 19:13:07.643281+00	2026-05-30
35	\N	2026-06-02	2026-06-12	66b92731-a181-43ba-919b-ad7c43b4a459	EP 210 Sul	\N	Lançado\n01 Zero Lactose - entregue\n01 Frescal - FE	107.00	Programado	2026-06-04 22:48:09.958183+00	\N
20	1598ea2d-b68e-4d24-a1d5-b7f9d6786441	2026-05-27	2026-05-28	0573af41-d3e7-4fdc-848e-57929d11f148	CESAS	SQS 104  Bloco K  Apt 602	Produtos lançados\n01 Frescal\n01 Vila Caipira\n01 Kit Parm. Buba\n01 Grana 	256.00	Entregue	2026-05-27 20:48:28.051249+00	2026-05-28
21	eec2ce01-22f0-40b8-9610-e642d660f659	2026-05-27	2026-05-28	42265198-db47-4a91-b891-43e3184adb6d	306 Norte	\N	Produto Lançado\n01 Tia Carla	40.00	Entregue	2026-05-27 20:53:11.703992+00	2026-05-28
5	e1bb310a-2280-48cf-b839-faf9b97e328f	2026-05-15	2026-06-11	013c7314-12b4-4631-ad1e-bd119a9ce7cb	Objetivo	Objetivo	02 Provolone com Picanha | R$ 126,00	126.00	Entregue	2026-05-16 00:54:12.562347+00	2026-06-11
28	946b4c0b-edda-4fbd-9537-a520c3159892	2026-05-30	2026-06-02	0868576b-90a9-4c3e-9ee0-f337995b072d	DECOR	\N	01 Parmesão Defunmado | R$ 60,00\n01 Blueberry e mel | R$ 39,00\n01 provolone tradicional | R$ 50,00	149.00	Entregue	2026-05-30 14:21:30.49597+00	2026-06-04
38	\N	2026-06-05	2026-06-15	5218d663-d6a4-494c-9157-77ac26e69629	Paulo Freire 	\N	1x Queijo do Reino (Bola)\n1x Geleia de Pimenta  c/ Blueberry e Mel \nTotal de itens: 2	85.00	Programado	2026-06-05 22:08:18.706772+00	\N
40	\N	2026-06-11	2026-06-24	634cdd70-7737-47d3-af78-c9c88e309382	CHPP	\N	01 Bala de Doce de Leite - Falta Lançar	39.00	Programado	2026-06-11 19:48:50.703804+00	\N
33	a868c328-38b9-4426-8f19-f561c8f75496	2026-06-02	2026-06-12	e21e1f7e-c755-4343-af89-3a3677a62762	Robson - EP 210 Sul	Robson - EP 210 Sul	01 canastra na caixa 	90.00	Entregue	2026-06-04 22:41:11.763538+00	2026-06-12
37	5d7f3e3a-87cd-4481-907f-eb0820510eb3	2026-06-02	2026-06-12	e21e1f7e-c755-4343-af89-3a3677a62762	Érika - EC 113 Norte	\N	01 Kitão - Lançado	75.00	Entregue	2026-06-04 23:05:31.503702+00	2026-06-09
36	eecc30ce-0a87-48fe-b4c8-e75573b7e20f	2026-06-02	2026-06-12	5128a772-249f-4d06-ac54-d40499f7a007	EC 113 Norte	\N	01 Kitão - Lançado	75.00	Entregue	2026-06-04 23:04:33.269033+00	2026-06-09
39	d7204671-5655-48eb-a393-9244f6a62b79	2026-06-06	2026-06-17	e33e4cd0-a716-4433-b747-ca1150c2da80	EC 304 Norte	\N	01 Foundant Zero açucar	50.00	Entregue	2026-06-06 13:41:48.800141+00	2026-06-09
32	01392a0a-fd76-46f4-8fb8-a1ad1f408912	2026-06-01	2026-06-11	80d1408f-e1e8-4ae5-9e99-7b88ab0ea20c	EC 113 Norte	\N	01 Trufado Azeitona - lançado em produtos	65.00	Entregue	2026-06-04 22:21:06.123693+00	2026-06-09
45	\N	2026-06-16	2026-06-23	651dbbcf-fa79-4ad6-aa90-ae6b39fd6f3d	CEDLAN	CEDLAN	Itens: lançados\n01 kit 3em 1\n	49.00	Programado	2026-06-16 20:41:13.802019+00	\N
44	\N	2026-06-16	2026-06-23	1cd96dff-cbed-4d45-9b2d-3dc0a1020b18	CEDLAN	CEDLAN	Itens: Lançados\n01 Lombinho Tradicional • R$ 49,00 	49.00	Programado	2026-06-16 19:42:24.916834+00	\N
41	9aef2e4c-fea4-4676-b500-0e15f8f8909b	2026-06-11	2026-06-15	80d1408f-e1e8-4ae5-9e99-7b88ab0ea20c	EC 113 Norte	\N	01 Provolone c/ Salame - Lançado	49.00	Entregue	2026-06-11 19:49:32.16417+00	2026-06-13
47	\N	2026-06-17	2026-06-26	a4053193-1f29-4682-8db3-b1ae8883e829	EC 405 Norte	EC 405 Norte	Itens:\n01 Tropical Pedaço Tradicional • R$ 38,00 	38.00	Programado	2026-06-17 22:59:55.855335+00	\N
34	86d5d105-491f-4506-aa8e-17ffaf3314c7	2026-06-02	2026-06-19	21f05c24-083e-4d83-b0a7-ae1701618392	EP 210 Sul	\N	01 Vale prata 2Lts - lançado e pago	0.01	Entregue	2026-06-04 22:47:00.324596+00	2026-06-13
42	\N	2026-06-15	2026-06-22	571f9e26-f977-4785-8824-70156cb777b0	EP 210 Norte	EP 210 Norte	Itens:\n01 Café Saga 	55.00	Programado	2026-06-16 01:00:11.902912+00	\N
46	6ccbd4e5-0098-4149-85fb-2f26ddcbb205	2026-06-16	2026-06-17	89b2ac7b-7d17-440a-bfd5-742628eecb70	EP 304 Norte	EP 304 Norte	Itens lançados\n02 Requeijã Búfala • R$ 55,00 und. • Total R$ 110,00\n01 Trufado Azeitona • R$ 65,00 und. • Total R$ 65,00\n01 Reino • R$ 55,00 und. • Total R$ 55,00\n01 Mussarela de Búfala • R$ 55,00 und. • Total R$ 55,00\n	285.00	Entregue	2026-06-16 20:52:31.214535+00	2026-06-18
48	\N	2026-06-18	2026-06-26	dcad2126-ab7f-4f45-903c-642941c75bdb	EP 314 Sul	EP 314 Sul	\nItens: Lançados\n01 Desidratado Com Goiaba • Kaise\n01 Desidratado Com Goiaba • Grazy	80.00	Programado	2026-06-18 22:01:26.318052+00	\N
\.


--
-- Data for Name: delivery_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.delivery_backup_20260523 (id, venda_id, data_pedido, data_entrega, cliente_id, referencia, local_entrega, descricao, valor_total, status, created_at) FROM stdin;
4	\N	2026-05-15	2026-05-18	3bb6ec2b-0b46-4ae2-84d2-ff95d7af0103	306 Norte	\N	01 Cocada Cremosa Tradicional	49.00	Programado	2026-05-16 00:48:54.607932+00
5	\N	2026-05-15	2026-05-21	013c7314-12b4-4631-ad1e-bd119a9ce7cb	Objetivo	Objetivo	01 Provolone com Picanha	69.00	Programado	2026-05-16 00:54:12.562347+00
9	\N	2026-05-19	2026-05-22	c604d014-cf0f-42ab-85bd-6ff27519d412	306 Norte	\N	01 Mix	55.00	Programado	2026-05-19 20:15:34.195438+00
10	\N	2026-05-19	2026-05-22	42265198-db47-4a91-b891-43e3184adb6d	306 Norte	\N	01 Provolone des. Goiabada	40.00	Programado	2026-05-19 20:16:14.891794+00
11	\N	2026-05-19	2026-05-22	04e10bcf-0b80-49ad-8a00-d9af4a455952	306 Norte	\N	01 Rosquinha de Nata c/ Goiabada	40.00	Programado	2026-05-19 20:16:52.639289+00
12	\N	2026-05-19	2026-05-22	c0aa151d-0aba-4c9a-bc6d-520971eb8f65	306 Norte	\N	02 Rosquinha de Nata c/ Goiabada	80.00	Programado	2026-05-19 20:17:38.593583+00
13	\N	2026-05-20	2026-05-26	d29586e8-6c89-433e-98db-f4da7b77b82f	Setor Oeste 	\N	02 Provolone c/ Goiabada	80.00	Programado	2026-05-20 19:55:58.102028+00
14	\N	2026-05-20	2026-05-26	bd6b01b7-9ef8-4cac-882d-d68ace666140	Setor Oeste	\N	01 Vale da Canastra 2Lts	90.00	Programado	2026-05-20 19:56:33.032977+00
15	\N	2026-05-21	2026-05-26	fca883c0-51e4-4a5a-a8d9-ae27fac505af	314 Sul	314 Sul	08 Talharim 	160.00	Programado	2026-05-21 16:56:09.936604+00
\.


--
-- Data for Name: despesas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.despesas (id, data_despesa, categoria, descricao, valor, observacao, created_at) FROM stdin;
9	2026-05-13	Abastecimento	20 Lts	124.24	6,21 o Litro	2026-05-16 02:15:13.150384+00
10	2026-05-14	Outros custos	Frete Gegê	320.00	160 Peças	2026-05-16 02:15:41.926639+00
12	2026-05-13	Degustação	Paulo Freire	23.58	01 Reino 	2026-05-17 00:20:28.446019+00
13	2026-05-11	Degustação	CEAN / EP 210 NORTE	23.58	\N	2026-05-17 00:24:12.367353+00
11	2026-05-11	Outros custos	Oleo motor Gol 20w40	29.00	\N	2026-05-17 00:19:03.596674+00
17	2026-05-20	Degustação	Setor Oeste	23.58	01 trança	2026-05-20 20:11:49.279308+00
14	2026-05-15	Degustação	kit 3em 1 Buba	21.00	Seb	2026-05-17 13:31:30.98534+00
18	2026-05-28	Outros custos	Frete 26/05/2026	280.00	138 peças arrendondei o valor	2026-05-28 21:01:18.557708+00
19	2026-05-26	Abastecimento	Baratão	158.84	25 Lts	2026-05-28 22:56:23.960058+00
20	2026-05-30	Outros custos	Liquido Arrefecimento	25.00	\N	2026-05-30 23:13:15.947478+00
21	2026-05-30	Abastecimento	Baratão 	125.26	20Lts	2026-05-30 23:14:26.073149+00
23	2026-06-01	Outros custos	Sacolas 	54.00	WA E,balagens	2026-06-04 23:42:18.996095+00
24	2026-06-01	Degustação	EP 210 Sul	22.00	01 Provolone	2026-06-04 23:48:21.919497+00
25	2026-06-09	Abastecimento	Baratão	185.70	30 Lts	2026-06-09 22:14:43.912097+00
26	2026-06-09	Degustação	requeijão	24.65	\N	2026-06-09 22:15:38.47487+00
\.


--
-- Data for Name: despesas_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.despesas_backup_20260523 (id, data_despesa, categoria, descricao, valor, observacao, created_at) FROM stdin;
9	2026-05-13	Abastecimento	20 Lts	124.24	6,21 o Litro	2026-05-16 02:15:13.150384+00
10	2026-05-14	Outros custos	Frete Gegê	320.00	160 Peças	2026-05-16 02:15:41.926639+00
12	2026-05-13	Degustação	Paulo Freire	23.58	01 Reino 	2026-05-17 00:20:28.446019+00
13	2026-05-11	Degustação	CEAN / EP 210 NORTE	23.58	\N	2026-05-17 00:24:12.367353+00
11	2026-05-11	Outros custos	Oleo motor Gol 20w40	29.00	\N	2026-05-17 00:19:03.596674+00
17	2026-05-20	Degustação	Setor Oeste	23.58	01 trança	2026-05-20 20:11:49.279308+00
14	2026-05-15	Degustação	kit 3em 1 Buba	21.00	Seb	2026-05-17 13:31:30.98534+00
\.


--
-- Data for Name: fornecedores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fornecedores (id, created_at, updated_at, nome, contato, telefone, cidade, observacao, ativo) FROM stdin;
5	2026-05-10 14:42:08.6225+00	2026-05-10 14:42:08.6225+00	Celeiros de Minas	Eduardo / Sandy	5537991945320	Piumhi	https://celeiros-de-minas.ola.click/	t
6	2026-05-10 15:00:37.334335+00	2026-05-10 15:00:37.334335+00	Associação | AGRUQUE	\N	5537998632733	Piumnhi	https://pedacodacanastra.ola.click/	t
7	2026-05-10 19:12:34.974483+00	2026-05-10 19:12:34.974483+00	Jean | Reino de Minas	Jean	5537999386591	Formiga	https://reinodeminas.smartpos.app/	t
8	2026-05-10 19:13:43.945854+00	2026-05-10 19:13:43.945854+00	Buba Canastra	\N	5537999571727	Piumhi	\N	t
9	2026-05-10 19:14:52.529033+00	2026-05-10 19:14:52.529033+00	Ândrea | Rosquinhas	Ândrea	5537999276778	Piumhi	\N	t
10	2026-05-10 19:15:56.691734+00	2026-05-10 19:15:56.691734+00	Doces Tanguinho	Terezinha	5537999258109	Piumhi	\N	t
12	2026-05-10 19:18:03.308545+00	2026-05-10 19:18:03.308545+00	Van ita	\N	5537999185516	Piumhi	\N	t
13	2026-05-10 19:19:14.621677+00	2026-05-10 19:19:14.621677+00	Divinos	Tatiana	5537999695334	Piumhi	\N	t
14	2026-05-10 19:20:03.741381+00	2026-05-10 19:20:03.741381+00	Snaks Desidratados	Luciene	5537999636754	Piumhi	\N	t
15	2026-05-10 19:20:57.657235+00	2026-05-10 19:20:57.657235+00	Cachaça Vale Da Canastra	\N	5537991973739	Piumhi	\N	t
11	2026-05-10 19:16:58.361541+00	2026-05-10 19:16:58.361541+00	Frescal R 	Rafaela	5537999585108	Piumhi	Chave Pix: 20.396.408/0001-31	t
17	2026-05-27 21:48:36.895177+00	2026-05-27 21:48:36.895177+00	Kelcio	\N		Brasília	\N	t
16	2026-05-17 23:08:38.986257+00	2026-05-17 23:08:38.986257+00	Daniel	Natália ou Ana 		Brasília	\N	t
18	2026-06-08 20:53:52.735282+00	2026-06-08 20:53:52.735282+00	Canastra Original	\N		Piunhi	\N	t
19	2026-06-09 22:10:30.292723+00	2026-06-09 22:10:30.292723+00	Vila Caipira	\N		Piunhi	\N	t
\.


--
-- Data for Name: fornecedores_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fornecedores_backup_20260523 (id, created_at, updated_at, nome, contato, telefone, cidade, observacao, ativo) FROM stdin;
5	2026-05-10 14:42:08.6225+00	2026-05-10 14:42:08.6225+00	Celeiros de Minas	Eduardo / Sandy	5537991945320	Piumhi	https://celeiros-de-minas.ola.click/	t
6	2026-05-10 15:00:37.334335+00	2026-05-10 15:00:37.334335+00	Associação | AGRUQUE	\N	5537998632733	Piumnhi	https://pedacodacanastra.ola.click/	t
7	2026-05-10 19:12:34.974483+00	2026-05-10 19:12:34.974483+00	Jean | Reino de Minas	Jean	5537999386591	Formiga	https://reinodeminas.smartpos.app/	t
8	2026-05-10 19:13:43.945854+00	2026-05-10 19:13:43.945854+00	Buba Canastra	\N	5537999571727	Piumhi	\N	t
9	2026-05-10 19:14:52.529033+00	2026-05-10 19:14:52.529033+00	Ândrea | Rosquinhas	Ândrea	5537999276778	Piumhi	\N	t
10	2026-05-10 19:15:56.691734+00	2026-05-10 19:15:56.691734+00	Doces Tanguinho	Terezinha	5537999258109	Piumhi	\N	t
11	2026-05-10 19:16:58.361541+00	2026-05-10 19:16:58.361541+00	Frescal R 	Rafaela	5537999585108	Piumhi	\N	t
12	2026-05-10 19:18:03.308545+00	2026-05-10 19:18:03.308545+00	Van ita	\N	5537999185516	Piumhi	\N	t
13	2026-05-10 19:19:14.621677+00	2026-05-10 19:19:14.621677+00	Divinos	Tatiana	5537999695334	Piumhi	\N	t
14	2026-05-10 19:20:03.741381+00	2026-05-10 19:20:03.741381+00	Snaks Desidratados	Luciene	5537999636754	Piumhi	\N	t
15	2026-05-10 19:20:57.657235+00	2026-05-10 19:20:57.657235+00	Cachaça Vale Da Canastra	\N	5537991973739	Piumhi	\N	t
16	2026-05-17 23:08:38.986257+00	2026-05-17 23:08:38.986257+00	Daniel	Natália ou Ana 		Brasília	\N	t
\.


--
-- Data for Name: itens_venda; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.itens_venda (id, venda_id, produto_id, fornecedor_id, quantidade, preco_custo, preco_venda, subtotal_custo, subtotal_venda, lucro, observacao, created_at) FROM stdin;
28	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	3fb2bcc6-66a1-48f7-9f44-4303bcbd42c8	6	1.00	76.81	190.00	76.81	190.00	113.19	\N	2026-05-15 21:19:54.887019+00
29	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	91e47043-a834-49e0-9a32-c816b23bda36	5	1.00	33.85	65.00	33.85	65.00	31.15	\N	2026-05-15 21:37:54.087035+00
30	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	22.20	45.00	22.20	45.00	22.80	\N	2026-05-15 21:38:07.350925+00
31	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-15 21:38:23.641292+00
32	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-15 21:38:36.57618+00
33	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	13194c47-554b-47d8-9364-1a4e5eacf24b	\N	1.00	20.70	45.00	20.70	45.00	24.30	\N	2026-05-15 21:38:50.692467+00
35	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-15 21:40:34.262047+00
34	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-15 21:40:22.771552+00
36	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	63b031d6-c373-423c-9f26-35422f608369	7	1.00	24.05	50.00	24.05	50.00	25.95	\N	2026-05-15 22:03:35.83122+00
37	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-15 22:04:03.262458+00
38	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-15 22:04:20.416774+00
39	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	0487055c-6183-45da-a5ff-9c46c8ede331	6	1.00	27.05	49.00	27.05	49.00	21.95	\N	2026-05-15 22:04:32.320107+00
40	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	20afc8d4-63b6-4cfe-b9c8-4988eda32993	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-15 22:04:41.027939+00
41	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-15 22:04:49.473792+00
42	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-15 23:31:55.788351+00
43	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-15 23:32:15.93773+00
44	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	3d9db912-16cc-42ad-b187-93c109f4920a	6	1.00	28.00	50.00	28.00	50.00	22.00	\N	2026-05-15 23:32:48.652872+00
45	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	1.00	12.99	35.00	12.99	35.00	22.01	\N	2026-05-15 23:32:55.108854+00
46	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-15 23:33:08.859298+00
47	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	1f300abf-904d-4b4e-ad3e-b354d0e37310	6	1.00	17.65	40.00	17.65	40.00	22.35	\N	2026-05-15 23:33:20.200835+00
48	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	f30b3e28-f290-4954-b818-0a608fa7c654	5	3.00	33.30	58.00	99.90	174.00	74.10	\N	2026-05-15 23:33:38.124239+00
49	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	2.00	24.00	49.00	48.00	98.00	50.00	\N	2026-05-15 23:33:49.072265+00
50	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	20afc8d4-63b6-4cfe-b9c8-4988eda32993	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-15 23:34:02.18597+00
51	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	50.00	26.55	50.00	23.45	\N	2026-05-15 23:34:12.44284+00
52	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	2.00	24.00	49.00	48.00	98.00	50.00	\N	2026-05-15 23:35:50.156966+00
54	00f90737-4a74-4eb1-93fe-d09eddf2b8ed	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	22.20	45.00	22.20	45.00	22.80	\N	2026-05-15 23:48:18.347911+00
55	9a97508b-6c4f-41e0-a489-6a329392730a	b5837a55-eb70-4f28-8745-1a52bb9c26dd	6	1.00	15.00	35.00	15.00	35.00	20.00	\N	2026-05-15 23:57:12.953332+00
56	9a97508b-6c4f-41e0-a489-6a329392730a	1f300abf-904d-4b4e-ad3e-b354d0e37310	6	1.00	17.65	40.00	17.65	40.00	22.35	\N	2026-05-15 23:57:25.768163+00
57	9a97508b-6c4f-41e0-a489-6a329392730a	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	2.00	18.00	40.00	36.00	80.00	44.00	\N	2026-05-15 23:57:36.832586+00
58	9a97508b-6c4f-41e0-a489-6a329392730a	127b5028-a4af-4315-b2c3-d3602918a0ba	5	3.00	18.50	45.00	55.50	135.00	79.50	\N	2026-05-15 23:57:50.582186+00
59	9a97508b-6c4f-41e0-a489-6a329392730a	b2b3aedd-b78c-4e74-bea2-a76c94462fb0	6	1.00	28.86	55.00	28.86	55.00	26.14	\N	2026-05-15 23:58:14.645862+00
60	9a97508b-6c4f-41e0-a489-6a329392730a	91e47043-a834-49e0-9a32-c816b23bda36	5	1.00	33.85	65.00	33.85	65.00	31.15	\N	2026-05-15 23:58:36.31609+00
61	9a97508b-6c4f-41e0-a489-6a329392730a	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-15 23:59:01.829889+00
53	00f90737-4a74-4eb1-93fe-d09eddf2b8ed	00e43702-47b9-48b7-b792-a0b68c8b59c1	8	4.00	14.09	39.00	56.36	156.00	99.64	\N	2026-05-15 23:48:07.051485+00
62	9a97508b-6c4f-41e0-a489-6a329392730a	7dee94ab-acfb-4afb-870f-f66f1de95b58	5	1.00	21.45	50.00	21.45	50.00	28.55	\N	2026-05-16 00:00:25.116729+00
63	9a97508b-6c4f-41e0-a489-6a329392730a	0487055c-6183-45da-a5ff-9c46c8ede331	6	1.00	27.05	49.00	27.05	49.00	21.95	\N	2026-05-16 00:00:34.164579+00
64	9a97508b-6c4f-41e0-a489-6a329392730a	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	3.00	21.22	45.00	63.66	135.00	71.34	\N	2026-05-16 00:00:48.847269+00
65	9a97508b-6c4f-41e0-a489-6a329392730a	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-16 00:00:58.864388+00
66	9a97508b-6c4f-41e0-a489-6a329392730a	4338276c-f346-4802-8341-51112846bce7	8	1.00	41.23	75.00	41.23	75.00	33.77	\N	2026-05-16 00:01:21.420311+00
67	4549c2f2-ed62-457a-b494-a016634abe36	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-05-16 00:20:36.3372+00
68	4549c2f2-ed62-457a-b494-a016634abe36	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-16 00:20:50.485017+00
69	4549c2f2-ed62-457a-b494-a016634abe36	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	2.00	30.83	60.00	61.66	120.00	58.34	\N	2026-05-16 00:21:03.380574+00
70	4549c2f2-ed62-457a-b494-a016634abe36	7dee94ab-acfb-4afb-870f-f66f1de95b58	5	1.00	21.45	50.00	21.45	50.00	28.55	\N	2026-05-16 00:21:25.686532+00
71	4549c2f2-ed62-457a-b494-a016634abe36	c9bd1e8e-7666-4002-ac41-16b2a1103d6a	8	1.00	40.00	75.00	40.00	75.00	35.00	\N	2026-05-16 00:21:40.527534+00
72	4549c2f2-ed62-457a-b494-a016634abe36	0487055c-6183-45da-a5ff-9c46c8ede331	6	2.00	27.05	49.00	54.10	98.00	43.90	\N	2026-05-16 00:21:54.006285+00
73	4549c2f2-ed62-457a-b494-a016634abe36	51ffc4d4-e18f-427a-9166-a5e75ec5c139	6	1.00	40.00	65.00	40.00	65.00	25.00	\N	2026-05-16 00:22:07.166097+00
74	4549c2f2-ed62-457a-b494-a016634abe36	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	50.00	26.55	50.00	23.45	\N	2026-05-16 00:22:19.684448+00
75	4549c2f2-ed62-457a-b494-a016634abe36	64c86f31-7d91-45bb-8b62-13e7116699f8	5	1.00	25.65	55.00	25.65	55.00	29.35	\N	2026-05-16 00:22:29.87966+00
76	4549c2f2-ed62-457a-b494-a016634abe36	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-16 00:22:58.170417+00
77	4549c2f2-ed62-457a-b494-a016634abe36	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	1.00	12.00	35.00	12.00	35.00	23.00	\N	2026-05-16 00:23:10.933712+00
78	4549c2f2-ed62-457a-b494-a016634abe36	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-05-16 00:23:22.095736+00
79	4549c2f2-ed62-457a-b494-a016634abe36	91e47043-a834-49e0-9a32-c816b23bda36	5	1.00	33.85	65.00	33.85	65.00	31.15	\N	2026-05-16 00:23:33.112887+00
80	4549c2f2-ed62-457a-b494-a016634abe36	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-16 00:23:43.287726+00
81	b81f4153-6d87-4cec-990d-1640330ad6e3	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	1.00	9.99	40.00	9.99	40.00	30.01	\N	2026-05-16 02:08:00.694545+00
82	b81f4153-6d87-4cec-990d-1640330ad6e3	8d04bbf2-bedd-471c-9fd4-7558e00dc514	5	1.00	22.35	49.00	22.35	49.00	26.65	\N	2026-05-16 02:08:08.802267+00
83	b81f4153-6d87-4cec-990d-1640330ad6e3	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-16 02:08:23.772902+00
84	b81f4153-6d87-4cec-990d-1640330ad6e3	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-16 02:08:28.836655+00
85	b81f4153-6d87-4cec-990d-1640330ad6e3	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-16 02:08:41.771485+00
86	b81f4153-6d87-4cec-990d-1640330ad6e3	ce5eb1c3-05b4-446c-bd6d-2ecfee916391	7	1.00	19.40	45.00	19.40	45.00	25.60	\N	2026-05-16 02:08:53.976586+00
87	b81f4153-6d87-4cec-990d-1640330ad6e3	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-16 02:09:05.876038+00
88	b81f4153-6d87-4cec-990d-1640330ad6e3	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	22.20	45.00	22.20	45.00	22.80	\N	2026-05-16 02:09:17.09572+00
89	b81f4153-6d87-4cec-990d-1640330ad6e3	b7d0920b-f6b4-45f5-b232-ecf138c4cb1e	6	1.00	20.27	49.00	20.27	49.00	28.73	\N	2026-05-16 02:09:29.68234+00
90	b81f4153-6d87-4cec-990d-1640330ad6e3	f30b3e28-f290-4954-b818-0a608fa7c654	5	2.00	33.30	58.00	66.60	116.00	49.40	\N	2026-05-16 02:09:41.414845+00
91	b81f4153-6d87-4cec-990d-1640330ad6e3	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-05-16 02:09:53.332022+00
92	b81f4153-6d87-4cec-990d-1640330ad6e3	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-05-16 02:10:03.927668+00
93	b81f4153-6d87-4cec-990d-1640330ad6e3	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-16 02:10:12.115097+00
94	b81f4153-6d87-4cec-990d-1640330ad6e3	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	2.00	21.22	45.00	42.44	90.00	47.56	\N	2026-05-16 02:10:25.149078+00
95	b81f4153-6d87-4cec-990d-1640330ad6e3	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	1.00	24.05	49.00	24.05	49.00	24.95	\N	2026-05-16 02:10:38.178826+00
96	e586b75f-0f41-4998-a4b2-c2667765f1b5	65c8da1f-3970-46b3-887b-cf6308c80ea6	8	3.00	24.67	49.00	74.01	147.00	72.99	\N	2026-05-16 20:55:04.262539+00
98	e586b75f-0f41-4998-a4b2-c2667765f1b5	b7d0920b-f6b4-45f5-b232-ecf138c4cb1e	6	1.00	20.27	49.00	20.27	49.00	28.73	\N	2026-05-16 20:55:58.433281+00
99	e586b75f-0f41-4998-a4b2-c2667765f1b5	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	3.00	22.00	45.00	66.00	135.00	69.00	\N	2026-05-16 20:56:17.327912+00
100	e586b75f-0f41-4998-a4b2-c2667765f1b5	163eed67-dfa7-47cb-bb26-72f6633f59cf	5	1.00	18.15	45.00	18.15	45.00	26.85	\N	2026-05-16 20:56:27.327151+00
101	e586b75f-0f41-4998-a4b2-c2667765f1b5	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-16 20:56:40.012301+00
102	e586b75f-0f41-4998-a4b2-c2667765f1b5	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	2.00	24.05	49.00	48.10	98.00	49.90	\N	2026-05-16 20:56:47.973539+00
103	e586b75f-0f41-4998-a4b2-c2667765f1b5	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-16 20:57:13.556548+00
104	e586b75f-0f41-4998-a4b2-c2667765f1b5	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	1.00	12.99	35.00	12.99	35.00	22.01	\N	2026-05-16 20:57:26.279123+00
105	e586b75f-0f41-4998-a4b2-c2667765f1b5	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	3.00	30.00	49.00	90.00	147.00	57.00	\N	2026-05-16 20:57:42.524452+00
106	e586b75f-0f41-4998-a4b2-c2667765f1b5	b2b3aedd-b78c-4e74-bea2-a76c94462fb0	6	1.00	28.86	55.00	28.86	55.00	26.14	\N	2026-05-16 20:57:52.805097+00
107	e586b75f-0f41-4998-a4b2-c2667765f1b5	06137af0-4bd9-4eac-93da-7ccfd6195fdf	5	1.00	17.50	40.00	17.50	40.00	22.50	\N	2026-05-16 20:58:02.284395+00
108	e586b75f-0f41-4998-a4b2-c2667765f1b5	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-16 20:58:11.063547+00
109	e586b75f-0f41-4998-a4b2-c2667765f1b5	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-05-16 20:58:19.551771+00
110	e586b75f-0f41-4998-a4b2-c2667765f1b5	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-16 20:58:31.569069+00
111	e586b75f-0f41-4998-a4b2-c2667765f1b5	62517356-0463-402d-bc31-940f9a522238	6	2.00	31.10	59.00	62.20	118.00	55.80	\N	2026-05-16 20:58:43.103313+00
112	e586b75f-0f41-4998-a4b2-c2667765f1b5	4338276c-f346-4802-8341-51112846bce7	8	1.00	41.23	75.00	41.23	75.00	33.77	\N	2026-05-16 20:58:52.067099+00
113	e586b75f-0f41-4998-a4b2-c2667765f1b5	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	1.00	18.00	40.00	18.00	40.00	22.00	\N	2026-05-16 20:59:05.579805+00
114	e586b75f-0f41-4998-a4b2-c2667765f1b5	c14aabde-93dc-44a2-a114-dce69171b34a	5	4.00	9.00	29.00	36.00	116.00	80.00	\N	2026-05-16 20:59:19.23521+00
115	e586b75f-0f41-4998-a4b2-c2667765f1b5	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-16 21:00:20.646896+00
116	e586b75f-0f41-4998-a4b2-c2667765f1b5	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-05-16 21:00:37.520268+00
117	e586b75f-0f41-4998-a4b2-c2667765f1b5	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	2.00	37.77	75.00	75.54	150.00	74.46	\N	2026-05-16 21:02:34.048535+00
118	e586b75f-0f41-4998-a4b2-c2667765f1b5	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-05-16 21:04:04.513197+00
119	e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	2.00	22.00	45.00	44.00	90.00	46.00	\N	2026-05-17 11:24:08.87668+00
121	a55382f4-8593-4d38-925c-b868fadc1edb	64c86f31-7d91-45bb-8b62-13e7116699f8	5	1.00	25.65	55.00	25.65	55.00	29.35	\N	2026-05-17 13:09:36.252673+00
122	a55382f4-8593-4d38-925c-b868fadc1edb	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-17 13:09:49.85359+00
123	a55382f4-8593-4d38-925c-b868fadc1edb	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-17 13:10:07.068569+00
124	a55382f4-8593-4d38-925c-b868fadc1edb	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-17 13:10:12.292029+00
125	a55382f4-8593-4d38-925c-b868fadc1edb	3d9db912-16cc-42ad-b187-93c109f4920a	6	1.00	28.00	50.00	28.00	50.00	22.00	\N	2026-05-17 13:10:32.000364+00
126	a55382f4-8593-4d38-925c-b868fadc1edb	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	1.00	12.99	35.00	12.99	35.00	22.01	\N	2026-05-17 13:10:51.33264+00
127	a55382f4-8593-4d38-925c-b868fadc1edb	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-17 13:11:00.312145+00
128	a55382f4-8593-4d38-925c-b868fadc1edb	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-17 13:11:11.822699+00
129	a55382f4-8593-4d38-925c-b868fadc1edb	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-17 13:11:38.996587+00
130	a55382f4-8593-4d38-925c-b868fadc1edb	d9168dbf-8847-42aa-8339-3fb00d6d1708	5	1.00	36.80	58.00	36.80	58.00	21.20	\N	2026-05-17 13:11:54.678723+00
131	a55382f4-8593-4d38-925c-b868fadc1edb	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	50.00	26.55	50.00	23.45	\N	2026-05-17 13:12:07.824571+00
132	a55382f4-8593-4d38-925c-b868fadc1edb	ce5eb1c3-05b4-446c-bd6d-2ecfee916391	7	1.00	19.40	45.00	19.40	45.00	25.60	\N	2026-05-17 13:12:19.449559+00
133	a55382f4-8593-4d38-925c-b868fadc1edb	4ea61f2a-96e4-417a-a994-3ca4aca6863a	7	1.00	27.50	59.00	27.50	59.00	31.50	\N	2026-05-17 13:12:38.594169+00
134	a55382f4-8593-4d38-925c-b868fadc1edb	34d9c074-bebe-4b26-b684-1a621789839a	5	1.00	32.00	49.00	32.00	49.00	17.00	\N	2026-05-17 13:12:50.676209+00
135	a55382f4-8593-4d38-925c-b868fadc1edb	10ea1108-3a24-4991-a32b-c5523ead4e83	6	2.00	23.90	49.00	47.80	98.00	50.20	\N	2026-05-17 13:13:07.110858+00
136	a55382f4-8593-4d38-925c-b868fadc1edb	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	2.00	30.83	60.00	61.66	120.00	58.34	\N	2026-05-17 13:13:19.014337+00
137	a55382f4-8593-4d38-925c-b868fadc1edb	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	2.00	12.00	35.00	24.00	70.00	46.00	\N	2026-05-17 13:13:26.863125+00
138	a55382f4-8593-4d38-925c-b868fadc1edb	65c8da1f-3970-46b3-887b-cf6308c80ea6	8	1.00	24.67	49.00	24.67	49.00	24.33	\N	2026-05-17 13:13:37.217929+00
139	a55382f4-8593-4d38-925c-b868fadc1edb	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	1.00	21.22	45.00	21.22	45.00	23.78	\N	2026-05-17 13:13:49.788418+00
140	a55382f4-8593-4d38-925c-b868fadc1edb	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-17 13:13:59.464209+00
141	a55382f4-8593-4d38-925c-b868fadc1edb	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	2.00	25.02	49.00	50.04	98.00	47.96	\N	2026-05-17 13:14:11.180048+00
142	a55382f4-8593-4d38-925c-b868fadc1edb	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-17 13:14:21.793431+00
143	a55382f4-8593-4d38-925c-b868fadc1edb	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-17 13:14:34.121264+00
144	a55382f4-8593-4d38-925c-b868fadc1edb	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-05-17 13:14:39.381337+00
145	5eb11394-53b5-4254-821d-45d92f8a0ce6	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	1.00	9.99	40.00	9.99	40.00	30.01	\N	2026-05-17 13:24:05.8383+00
146	5eb11394-53b5-4254-821d-45d92f8a0ce6	20afc8d4-63b6-4cfe-b9c8-4988eda32993	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-17 13:24:18.392803+00
147	5eb11394-53b5-4254-821d-45d92f8a0ce6	163eed67-dfa7-47cb-bb26-72f6633f59cf	5	1.00	18.15	45.00	18.15	45.00	26.85	\N	2026-05-17 13:24:24.441713+00
148	5eb11394-53b5-4254-821d-45d92f8a0ce6	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-17 13:24:32.909822+00
149	5eb11394-53b5-4254-821d-45d92f8a0ce6	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-17 13:24:44.229823+00
150	5eb11394-53b5-4254-821d-45d92f8a0ce6	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-05-17 13:24:52.580428+00
151	5eb11394-53b5-4254-821d-45d92f8a0ce6	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-17 13:25:05.303586+00
152	5eb11394-53b5-4254-821d-45d92f8a0ce6	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-17 13:25:24.160539+00
153	5eb11394-53b5-4254-821d-45d92f8a0ce6	c9bd1e8e-7666-4002-ac41-16b2a1103d6a	8	1.00	40.00	75.00	40.00	75.00	35.00	\N	2026-05-17 13:25:51.324938+00
154	5eb11394-53b5-4254-821d-45d92f8a0ce6	b2b3aedd-b78c-4e74-bea2-a76c94462fb0	6	1.00	28.86	55.00	28.86	55.00	26.14	\N	2026-05-17 13:26:08.647271+00
155	5eb11394-53b5-4254-821d-45d92f8a0ce6	ce5eb1c3-05b4-446c-bd6d-2ecfee916391	7	1.00	19.40	45.00	19.40	45.00	25.60	\N	2026-05-17 13:26:22.460826+00
156	5eb11394-53b5-4254-821d-45d92f8a0ce6	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-05-17 13:26:36.432417+00
157	5eb11394-53b5-4254-821d-45d92f8a0ce6	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	2.00	24.05	49.00	48.10	98.00	49.90	\N	2026-05-17 13:27:00.176214+00
120	e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	11a35476-3eba-411a-8b8f-3ccfd86bbe70	6	2.00	27.00	65.00	54.00	130.00	76.00	\N	2026-05-17 11:25:32.76353+00
158	5eb11394-53b5-4254-821d-45d92f8a0ce6	4338276c-f346-4802-8341-51112846bce7	8	1.00	41.23	75.00	41.23	75.00	33.77	\N	2026-05-17 13:27:12.918424+00
159	5eb11394-53b5-4254-821d-45d92f8a0ce6	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-17 13:27:22.77088+00
160	5eb11394-53b5-4254-821d-45d92f8a0ce6	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	1.00	25.02	49.00	25.02	49.00	23.98	\N	2026-05-17 13:27:31.527654+00
161	5eb11394-53b5-4254-821d-45d92f8a0ce6	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	1.00	37.77	75.00	37.77	75.00	37.23	\N	2026-05-17 13:27:41.082145+00
162	5eb11394-53b5-4254-821d-45d92f8a0ce6	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-05-17 13:27:54.019173+00
163	5eb11394-53b5-4254-821d-45d92f8a0ce6	f30b3e28-f290-4954-b818-0a608fa7c654	5	3.00	33.30	58.00	99.90	174.00	74.10	\N	2026-05-17 13:28:04.942331+00
164	5eb11394-53b5-4254-821d-45d92f8a0ce6	6ef878fc-08ae-4848-bd69-d65692254dc8	5	2.00	15.50	35.00	31.00	70.00	39.00	\N	2026-05-17 13:28:28.932042+00
97	e586b75f-0f41-4998-a4b2-c2667765f1b5	3fb2bcc6-66a1-48f7-9f44-4303bcbd42c8	6	0.00	76.81	190.00	0.00	0.00	0.00	\N	2026-05-16 20:55:22.661252+00
165	489cec38-1522-4fe1-9655-3673a422ed6c	34d9c074-bebe-4b26-b684-1a621789839a	5	1.00	32.00	49.00	32.00	49.00	17.00	\N	2026-05-18 19:20:37.525676+00
166	489cec38-1522-4fe1-9655-3673a422ed6c	1f300abf-904d-4b4e-ad3e-b354d0e37310	6	1.00	17.65	40.00	17.65	40.00	22.35	\N	2026-05-18 19:20:46.712187+00
168	489cec38-1522-4fe1-9655-3673a422ed6c	163eed67-dfa7-47cb-bb26-72f6633f59cf	5	1.00	18.15	45.00	18.15	45.00	26.85	\N	2026-05-18 19:21:09.221662+00
169	489cec38-1522-4fe1-9655-3673a422ed6c	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	3.00	18.30	40.00	54.90	120.00	65.10	\N	2026-05-18 19:21:22.627747+00
170	489cec38-1522-4fe1-9655-3673a422ed6c	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	8	1.00	44.87	75.00	44.87	75.00	30.13	\N	2026-05-18 19:21:31.072346+00
172	489cec38-1522-4fe1-9655-3673a422ed6c	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-05-18 19:22:24.319779+00
173	489cec38-1522-4fe1-9655-3673a422ed6c	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	1.00	24.05	49.00	24.05	49.00	24.95	\N	2026-05-18 19:22:36.795326+00
174	489cec38-1522-4fe1-9655-3673a422ed6c	62517356-0463-402d-bc31-940f9a522238	6	1.00	31.10	59.00	31.10	59.00	27.90	\N	2026-05-18 19:22:44.020453+00
175	489cec38-1522-4fe1-9655-3673a422ed6c	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-18 19:22:56.712207+00
176	489cec38-1522-4fe1-9655-3673a422ed6c	8d04bbf2-bedd-471c-9fd4-7558e00dc514	5	1.00	22.35	49.00	22.35	49.00	26.65	\N	2026-05-18 19:23:01.62956+00
177	489cec38-1522-4fe1-9655-3673a422ed6c	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	2.00	25.02	49.00	50.04	98.00	47.96	\N	2026-05-18 19:23:19.465577+00
178	489cec38-1522-4fe1-9655-3673a422ed6c	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-05-18 19:23:28.823065+00
179	489cec38-1522-4fe1-9655-3673a422ed6c	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	1.00	37.77	75.00	37.77	75.00	37.23	\N	2026-05-18 19:23:37.039743+00
180	489cec38-1522-4fe1-9655-3673a422ed6c	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-05-18 19:23:46.231189+00
181	489cec38-1522-4fe1-9655-3673a422ed6c	d9168dbf-8847-42aa-8339-3fb00d6d1708	5	1.00	36.80	58.00	36.80	58.00	21.20	\N	2026-05-18 19:24:02.984855+00
171	489cec38-1522-4fe1-9655-3673a422ed6c	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	3.00	12.00	35.00	36.00	105.00	69.00	\N	2026-05-18 19:21:39.051789+00
167	489cec38-1522-4fe1-9655-3673a422ed6c	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	2.00	9.99	40.00	19.98	80.00	60.02	\N	2026-05-18 19:20:54.830456+00
182	489cec38-1522-4fe1-9655-3673a422ed6c	4ea61f2a-96e4-417a-a994-3ca4aca6863a	7	1.00	27.50	59.00	27.50	59.00	31.50	\N	2026-05-18 19:28:11.987272+00
183	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-19 20:23:39.983886+00
184	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	4.00	18.30	40.00	73.20	160.00	86.80	\N	2026-05-19 20:23:47.512166+00
185	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-19 20:24:52.856972+00
186	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-19 20:25:17.157878+00
187	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	63b031d6-c373-423c-9f26-35422f608369	7	1.00	24.05	50.00	24.05	50.00	25.95	\N	2026-05-19 20:25:30.63503+00
188	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	8	2.00	44.87	75.00	89.74	150.00	60.26	\N	2026-05-19 20:25:50.658808+00
189	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-19 20:25:59.890197+00
190	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	06137af0-4bd9-4eac-93da-7ccfd6195fdf	5	1.00	17.50	40.00	17.50	40.00	22.50	\N	2026-05-19 20:26:12.614842+00
191	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	55.00	26.55	55.00	28.45	\N	2026-05-19 20:26:17.045904+00
192	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	0487055c-6183-45da-a5ff-9c46c8ede331	6	1.00	27.05	55.00	27.05	55.00	27.95	\N	2026-05-19 20:26:30.736056+00
193	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	13194c47-554b-47d8-9364-1a4e5eacf24b	\N	1.00	20.70	45.00	20.70	45.00	24.30	\N	2026-05-19 20:26:40.137183+00
194	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	ce5eb1c3-05b4-446c-bd6d-2ecfee916391	7	1.00	19.40	45.00	19.40	45.00	25.60	\N	2026-05-19 20:26:44.624609+00
195	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-19 20:26:59.717451+00
196	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	3.00	12.00	35.00	36.00	105.00	69.00	\N	2026-05-19 20:27:05.091741+00
197	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	62517356-0463-402d-bc31-940f9a522238	6	1.00	31.10	59.00	31.10	59.00	27.90	\N	2026-05-19 20:27:19.420695+00
198	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	4338276c-f346-4802-8341-51112846bce7	8	1.00	41.23	75.00	41.23	75.00	33.77	\N	2026-05-19 20:27:26.863176+00
199	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	e5d51236-1d54-4aab-a945-67574c9eaadc	6	1.00	15.75	45.00	15.75	45.00	29.25	\N	2026-05-19 20:27:44.883284+00
200	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	3.00	18.00	40.00	54.00	120.00	66.00	\N	2026-05-19 20:27:53.820216+00
201	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-19 20:28:09.206899+00
202	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	2.00	37.77	75.00	75.54	150.00	74.46	\N	2026-05-19 20:28:24.561038+00
203	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-19 20:28:35.114867+00
204	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	2.00	18.30	40.00	36.60	80.00	43.40	\N	2026-05-20 20:05:02.601641+00
205	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	6ef878fc-08ae-4848-bd69-d65692254dc8	5	2.00	15.50	35.00	31.00	70.00	39.00	\N	2026-05-20 20:05:06.729213+00
206	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	8d04bbf2-bedd-471c-9fd4-7558e00dc514	5	2.00	22.35	49.00	44.70	98.00	53.30	\N	2026-05-20 20:05:31.115777+00
207	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	127b5028-a4af-4315-b2c3-d3602918a0ba	5	2.00	18.50	45.00	37.00	90.00	53.00	\N	2026-05-20 20:05:41.413195+00
208	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	55.00	26.55	55.00	28.45	\N	2026-05-20 20:05:55.900649+00
209	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-20 20:06:07.05363+00
210	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	1.00	9.99	40.00	9.99	40.00	30.01	\N	2026-05-20 20:06:16.340095+00
211	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	65c8da1f-3970-46b3-887b-cf6308c80ea6	8	1.00	24.67	49.00	24.67	49.00	24.33	\N	2026-05-20 20:06:28.218385+00
212	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	8	1.00	44.87	75.00	44.87	75.00	30.13	\N	2026-05-20 20:06:39.585244+00
213	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	1.00	25.02	49.00	25.02	49.00	23.98	\N	2026-05-20 20:06:43.19713+00
214	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	1.00	37.77	75.00	37.77	75.00	37.23	\N	2026-05-20 20:06:57.223355+00
215	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	661923c8-ea64-4fd8-9d57-65cb523dd4c4	6	1.00	28.30	90.00	28.30	90.00	61.70	\N	2026-05-20 20:09:51.178661+00
216	c08bf390-9774-490e-b1f7-360ac3e25884	5a8834c8-1b56-4055-8e3c-c219b88c4571	6	0.00	23.92	49.00	0.00	0.00	0.00	\N	2026-05-27 20:37:29.589326+00
217	c08bf390-9774-490e-b1f7-360ac3e25884	5a8834c8-1b56-4055-8e3c-c219b88c4571	6	1.00	23.92	49.00	23.92	49.00	25.08	\N	2026-05-27 20:38:07.754538+00
218	c08bf390-9774-490e-b1f7-360ac3e25884	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-27 20:38:18.577217+00
219	c08bf390-9774-490e-b1f7-360ac3e25884	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	3.00	18.30	40.00	54.90	120.00	65.10	\N	2026-05-27 20:38:40.836328+00
220	c08bf390-9774-490e-b1f7-360ac3e25884	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	4.00	18.00	40.00	72.00	160.00	88.00	\N	2026-05-27 20:38:58.803989+00
221	c08bf390-9774-490e-b1f7-360ac3e25884	69546608-f7a8-48eb-95ef-ca13b0fc4949	6	7.00	9.99	20.00	69.93	140.00	70.07	\N	2026-05-27 20:39:19.241081+00
222	c08bf390-9774-490e-b1f7-360ac3e25884	661923c8-ea64-4fd8-9d57-65cb523dd4c4	6	1.00	28.30	90.00	28.30	90.00	61.70	\N	2026-05-27 20:39:34.594558+00
223	c08bf390-9774-490e-b1f7-360ac3e25884	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	2.00	37.77	75.00	75.54	150.00	74.46	\N	2026-05-27 20:40:04.960262+00
224	c08bf390-9774-490e-b1f7-360ac3e25884	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	23.31	49.00	23.31	49.00	25.69	\N	2026-05-27 20:40:19.183101+00
225	c08bf390-9774-490e-b1f7-360ac3e25884	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	1.00	12.00	35.00	12.00	35.00	23.00	\N	2026-05-27 20:40:31.331215+00
226	c08bf390-9774-490e-b1f7-360ac3e25884	1f300abf-904d-4b4e-ad3e-b354d0e37310	6	1.00	17.65	40.00	17.65	40.00	22.35	\N	2026-05-27 20:40:45.222609+00
227	c08bf390-9774-490e-b1f7-360ac3e25884	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	2.00	14.21	35.00	28.42	70.00	41.58	\N	2026-05-27 20:40:58.271084+00
228	47072fb3-68f3-40ed-b1c9-c0f7de542c25	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	4.00	18.00	40.00	72.00	160.00	88.00	\N	2026-05-27 21:04:50.660612+00
229	47072fb3-68f3-40ed-b1c9-c0f7de542c25	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	1.00	18.00	40.00	18.00	40.00	22.00	\N	2026-05-27 21:05:13.72648+00
230	47072fb3-68f3-40ed-b1c9-c0f7de542c25	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-27 21:05:29.66617+00
231	47072fb3-68f3-40ed-b1c9-c0f7de542c25	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-05-27 21:05:40.974348+00
232	47072fb3-68f3-40ed-b1c9-c0f7de542c25	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	23.31	49.00	23.31	49.00	25.69	\N	2026-05-27 21:05:52.133967+00
233	47072fb3-68f3-40ed-b1c9-c0f7de542c25	0d8d1224-deff-44b1-bcb2-4e6577bd7617	5	1.00	15.80	38.00	15.80	38.00	22.20	\N	2026-05-27 21:06:03.620432+00
234	47072fb3-68f3-40ed-b1c9-c0f7de542c25	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-27 21:06:19.487649+00
235	47072fb3-68f3-40ed-b1c9-c0f7de542c25	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-27 21:06:32.617235+00
236	47072fb3-68f3-40ed-b1c9-c0f7de542c25	1f300abf-904d-4b4e-ad3e-b354d0e37310	6	1.00	17.65	40.00	17.65	40.00	22.35	\N	2026-05-27 21:06:50.078786+00
237	47072fb3-68f3-40ed-b1c9-c0f7de542c25	369e5cbb-e9e9-489a-8e4e-3a0550be53a0	6	1.00	24.62	49.00	24.62	49.00	24.38	\N	2026-05-27 21:09:54.841325+00
238	47072fb3-68f3-40ed-b1c9-c0f7de542c25	b7d0920b-f6b4-45f5-b232-ecf138c4cb1e	6	1.00	20.27	49.00	20.27	49.00	28.73	\N	2026-05-27 21:10:07.958363+00
239	47072fb3-68f3-40ed-b1c9-c0f7de542c25	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-27 21:10:19.964204+00
240	47072fb3-68f3-40ed-b1c9-c0f7de542c25	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-27 21:10:39.760151+00
241	47072fb3-68f3-40ed-b1c9-c0f7de542c25	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-27 21:10:52.979535+00
242	47072fb3-68f3-40ed-b1c9-c0f7de542c25	c9bd1e8e-7666-4002-ac41-16b2a1103d6a	8	1.00	40.00	75.00	40.00	75.00	35.00	\N	2026-05-27 21:11:04.173636+00
243	47072fb3-68f3-40ed-b1c9-c0f7de542c25	dc9fb3b6-9881-438a-beb5-5b01878ff0d0	12	2.00	30.00	59.00	60.00	118.00	58.00	\N	2026-05-27 21:29:46.048207+00
282	0c51ed62-b867-47e8-af6b-81d2d654ebe4	c14aabde-93dc-44a2-a114-dce69171b34a	5	2.00	9.00	29.00	18.00	58.00	40.00	\N	2026-05-28 20:44:34.436141+00
246	1db901a8-a06d-47c7-9c39-91f8a6963eea	3fb2bcc6-66a1-48f7-9f44-4303bcbd42c8	6	1.00	76.81	190.00	76.81	190.00	113.19	\N	2026-05-28 20:07:36.814915+00
247	1db901a8-a06d-47c7-9c39-91f8a6963eea	661923c8-ea64-4fd8-9d57-65cb523dd4c4	6	1.00	28.30	90.00	28.30	90.00	61.70	\N	2026-05-28 20:07:47.094409+00
248	1db901a8-a06d-47c7-9c39-91f8a6963eea	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-28 20:08:07.013161+00
249	1db901a8-a06d-47c7-9c39-91f8a6963eea	127b5028-a4af-4315-b2c3-d3602918a0ba	5	2.00	18.50	45.00	37.00	90.00	53.00	\N	2026-05-28 20:08:25.092596+00
250	1db901a8-a06d-47c7-9c39-91f8a6963eea	64c86f31-7d91-45bb-8b62-13e7116699f8	5	1.00	25.65	55.00	25.65	55.00	29.35	\N	2026-05-28 20:08:39.572813+00
251	1db901a8-a06d-47c7-9c39-91f8a6963eea	c14aabde-93dc-44a2-a114-dce69171b34a	5	5.00	9.00	29.00	45.00	145.00	100.00	\N	2026-05-28 20:08:53.452447+00
252	1db901a8-a06d-47c7-9c39-91f8a6963eea	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	1.00	18.00	40.00	18.00	40.00	22.00	\N	2026-05-28 20:09:07.945964+00
253	1db901a8-a06d-47c7-9c39-91f8a6963eea	432a5a7b-c6ca-4d6b-bcdb-1d1c40b5cb2a	5	1.00	15.72	39.00	15.72	39.00	23.28	\N	2026-05-28 20:09:24.873373+00
254	1db901a8-a06d-47c7-9c39-91f8a6963eea	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-28 20:09:58.30848+00
255	1db901a8-a06d-47c7-9c39-91f8a6963eea	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-28 20:10:21.046977+00
256	1db901a8-a06d-47c7-9c39-91f8a6963eea	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-28 20:10:27.84094+00
257	1db901a8-a06d-47c7-9c39-91f8a6963eea	10ea1108-3a24-4991-a32b-c5523ead4e83	6	7.00	23.90	49.00	167.30	343.00	175.70	\N	2026-05-28 20:10:48.61396+00
258	1db901a8-a06d-47c7-9c39-91f8a6963eea	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	2.00	21.22	45.00	42.44	90.00	47.56	\N	2026-05-28 20:11:04.02742+00
259	1db901a8-a06d-47c7-9c39-91f8a6963eea	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	3.00	30.00	49.00	90.00	147.00	57.00	\N	2026-05-28 20:11:19.687749+00
260	1db901a8-a06d-47c7-9c39-91f8a6963eea	c9bd1e8e-7666-4002-ac41-16b2a1103d6a	8	1.00	40.00	75.00	40.00	75.00	35.00	\N	2026-05-28 20:11:36.378602+00
261	1db901a8-a06d-47c7-9c39-91f8a6963eea	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	5.00	45.17	79.00	225.85	395.00	169.15	\N	2026-05-28 20:11:52.306437+00
262	1db901a8-a06d-47c7-9c39-91f8a6963eea	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-05-28 20:11:58.280184+00
263	1db901a8-a06d-47c7-9c39-91f8a6963eea	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	1.00	37.77	75.00	37.77	75.00	37.23	\N	2026-05-28 20:12:12.485701+00
264	1db901a8-a06d-47c7-9c39-91f8a6963eea	6ef878fc-08ae-4848-bd69-d65692254dc8	5	3.00	15.50	35.00	46.50	105.00	58.50	\N	2026-05-28 20:12:28.116382+00
265	1db901a8-a06d-47c7-9c39-91f8a6963eea	b7d0920b-f6b4-45f5-b232-ecf138c4cb1e	6	1.00	20.27	49.00	20.27	49.00	28.73	\N	2026-05-28 20:12:48.714103+00
266	1db901a8-a06d-47c7-9c39-91f8a6963eea	13237c2d-dd72-4480-b274-670fa6fc511d	7	2.00	24.45	59.00	48.90	118.00	69.10	\N	2026-05-28 20:18:49.908375+00
267	1db901a8-a06d-47c7-9c39-91f8a6963eea	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-05-28 20:19:14.434784+00
268	0c51ed62-b867-47e8-af6b-81d2d654ebe4	f30b3e28-f290-4954-b818-0a608fa7c654	5	2.00	33.30	58.00	66.60	116.00	49.40	\N	2026-05-28 20:41:17.435665+00
269	0c51ed62-b867-47e8-af6b-81d2d654ebe4	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-28 20:41:28.159731+00
270	0c51ed62-b867-47e8-af6b-81d2d654ebe4	bbc46f88-e72d-4a49-a2e8-30e4786075f9	17	2.00	32.00	55.00	64.00	110.00	46.00	\N	2026-05-28 20:41:43.890737+00
271	0c51ed62-b867-47e8-af6b-81d2d654ebe4	e5d51236-1d54-4aab-a945-67574c9eaadc	6	1.00	15.75	45.00	15.75	45.00	29.25	\N	2026-05-28 20:42:01.393658+00
272	0c51ed62-b867-47e8-af6b-81d2d654ebe4	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-28 20:42:13.864965+00
273	0c51ed62-b867-47e8-af6b-81d2d654ebe4	81cd4fbc-60f3-4d2e-8257-04de4fac8034	6	1.00	19.64	45.00	19.64	45.00	25.36	\N	2026-05-28 20:42:29.516232+00
274	0c51ed62-b867-47e8-af6b-81d2d654ebe4	7d672959-251c-49e9-ab25-b236d9b1b2ec	5	2.00	19.59	45.00	39.18	90.00	50.82	\N	2026-05-28 20:42:41.357242+00
275	0c51ed62-b867-47e8-af6b-81d2d654ebe4	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	1.00	24.05	49.00	24.05	49.00	24.95	\N	2026-05-28 20:42:53.997814+00
276	0c51ed62-b867-47e8-af6b-81d2d654ebe4	d402b9dc-5085-4899-9b3e-bb7d04ca7a72	7	1.00	27.26	50.00	27.26	50.00	22.74	\N	2026-05-28 20:43:18.893349+00
277	0c51ed62-b867-47e8-af6b-81d2d654ebe4	0d8d1224-deff-44b1-bcb2-4e6577bd7617	5	2.00	15.80	38.00	31.60	76.00	44.40	\N	2026-05-28 20:43:31.71302+00
278	0c51ed62-b867-47e8-af6b-81d2d654ebe4	1f300abf-904d-4b4e-ad3e-b354d0e37310	6	1.00	17.65	40.00	17.65	40.00	22.35	\N	2026-05-28 20:43:50.408968+00
279	0c51ed62-b867-47e8-af6b-81d2d654ebe4	127b5028-a4af-4315-b2c3-d3602918a0ba	5	2.00	18.50	45.00	37.00	90.00	53.00	\N	2026-05-28 20:44:02.174153+00
280	0c51ed62-b867-47e8-af6b-81d2d654ebe4	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-28 20:44:13.048386+00
281	0c51ed62-b867-47e8-af6b-81d2d654ebe4	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	3.00	18.00	40.00	54.00	120.00	66.00	\N	2026-05-28 20:44:22.751627+00
283	0c51ed62-b867-47e8-af6b-81d2d654ebe4	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	1.00	9.99	40.00	9.99	40.00	30.01	\N	2026-05-28 20:44:44.070703+00
284	0c51ed62-b867-47e8-af6b-81d2d654ebe4	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	2.00	24.00	49.00	48.00	98.00	50.00	\N	2026-05-28 20:45:00.758978+00
285	fab8e9ca-9ff9-4cab-8a42-564543599080	9c0ecc03-bbc2-4723-bad8-b164194a6404	6	1.00	32.00	65.00	32.00	65.00	33.00	\N	2026-05-28 20:52:55.372914+00
286	8b078770-99de-4d77-bcc3-2e2f1e803e57	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-05-29 19:58:41.461885+00
287	8b078770-99de-4d77-bcc3-2e2f1e803e57	e83eb1a4-44c3-46aa-8bd7-0c2e39ac2b3b	6	5.00	36.73	59.00	183.65	295.00	111.35	\N	2026-05-29 19:59:06.218458+00
288	8b078770-99de-4d77-bcc3-2e2f1e803e57	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-29 19:59:21.393694+00
289	8b078770-99de-4d77-bcc3-2e2f1e803e57	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-05-29 19:59:32.618522+00
290	8b078770-99de-4d77-bcc3-2e2f1e803e57	63b031d6-c373-423c-9f26-35422f608369	7	1.00	24.05	50.00	24.05	50.00	25.95	\N	2026-05-29 19:59:54.491387+00
291	8b078770-99de-4d77-bcc3-2e2f1e803e57	6ef878fc-08ae-4848-bd69-d65692254dc8	5	4.00	15.50	35.00	62.00	140.00	78.00	\N	2026-05-29 20:00:07.585283+00
292	8b078770-99de-4d77-bcc3-2e2f1e803e57	128b1a35-a215-4fc0-b2f9-6e583b761b37	17	1.00	35.00	70.00	35.00	70.00	35.00	\N	2026-05-29 20:00:23.066806+00
293	8b078770-99de-4d77-bcc3-2e2f1e803e57	11a35476-3eba-411a-8b8f-3ccfd86bbe70	6	2.00	27.00	65.00	54.00	130.00	76.00	\N	2026-05-29 20:01:31.5464+00
295	208ec073-7f1a-4a25-bbb2-55143bd0a598	432a5a7b-c6ca-4d6b-bcdb-1d1c40b5cb2a	5	1.00	15.72	39.00	15.72	39.00	23.28	\N	2026-06-04 18:15:17.220703+00
296	208ec073-7f1a-4a25-bbb2-55143bd0a598	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	1.00	24.05	49.00	24.05	49.00	24.95	\N	2026-06-04 18:15:30.669529+00
297	208ec073-7f1a-4a25-bbb2-55143bd0a598	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-06-04 18:15:56.311478+00
298	208ec073-7f1a-4a25-bbb2-55143bd0a598	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-06-04 18:16:12.145321+00
299	917f4a98-8a29-4773-ba30-cef04b0e7322	6ef878fc-08ae-4848-bd69-d65692254dc8	5	3.00	15.50	35.00	46.50	105.00	58.50	\N	2026-06-04 22:28:04.172846+00
300	917f4a98-8a29-4773-ba30-cef04b0e7322	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	2.00	18.30	40.00	36.60	80.00	43.40	\N	2026-06-04 22:28:15.908941+00
301	917f4a98-8a29-4773-ba30-cef04b0e7322	369e5cbb-e9e9-489a-8e4e-3a0550be53a0	6	1.00	24.62	49.00	24.62	49.00	24.38	\N	2026-06-04 22:28:35.941184+00
302	917f4a98-8a29-4773-ba30-cef04b0e7322	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	1.00	24.05	49.00	24.05	49.00	24.95	\N	2026-06-04 22:28:40.077634+00
303	917f4a98-8a29-4773-ba30-cef04b0e7322	4ea61f2a-96e4-417a-a994-3ca4aca6863a	7	1.00	27.50	59.00	27.50	59.00	31.50	\N	2026-06-04 22:28:54.633431+00
304	917f4a98-8a29-4773-ba30-cef04b0e7322	81638b1e-a893-40d6-a39d-3c4069c6902e	6	2.00	24.05	49.00	48.10	98.00	49.90	\N	2026-06-04 22:29:09.602289+00
305	917f4a98-8a29-4773-ba30-cef04b0e7322	bc10d03f-8910-418b-9344-c5a73ebf1e05	5	1.00	16.10	35.00	16.10	35.00	18.90	\N	2026-06-04 22:29:38.227041+00
306	917f4a98-8a29-4773-ba30-cef04b0e7322	10ea1108-3a24-4991-a32b-c5523ead4e83	6	3.00	23.90	49.00	71.70	147.00	75.30	\N	2026-06-04 22:30:02.346391+00
307	917f4a98-8a29-4773-ba30-cef04b0e7322	128b1a35-a215-4fc0-b2f9-6e583b761b37	17	1.00	35.00	60.00	35.00	60.00	25.00	\N	2026-06-04 22:30:17.682974+00
308	917f4a98-8a29-4773-ba30-cef04b0e7322	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-06-04 22:30:40.184876+00
309	917f4a98-8a29-4773-ba30-cef04b0e7322	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	1.00	21.22	45.00	21.22	45.00	23.78	\N	2026-06-04 22:30:53.458935+00
310	917f4a98-8a29-4773-ba30-cef04b0e7322	9bc794ac-8e74-42e6-a559-c656bc3e732c	6	1.00	26.64	65.00	26.64	65.00	38.36	\N	2026-06-04 22:31:28.129897+00
311	917f4a98-8a29-4773-ba30-cef04b0e7322	51ffc4d4-e18f-427a-9166-a5e75ec5c139	16	1.00	40.00	65.00	40.00	65.00	25.00	\N	2026-06-04 22:31:39.406806+00
312	917f4a98-8a29-4773-ba30-cef04b0e7322	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-06-04 22:31:53.909582+00
313	917f4a98-8a29-4773-ba30-cef04b0e7322	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-06-04 22:32:13.249504+00
314	917f4a98-8a29-4773-ba30-cef04b0e7322	06137af0-4bd9-4eac-93da-7ccfd6195fdf	5	1.00	17.50	40.00	17.50	40.00	22.50	\N	2026-06-04 22:32:23.684594+00
315	917f4a98-8a29-4773-ba30-cef04b0e7322	8d04bbf2-bedd-471c-9fd4-7558e00dc514	5	1.00	22.35	49.00	22.35	49.00	26.65	\N	2026-06-04 22:32:37.448127+00
316	917f4a98-8a29-4773-ba30-cef04b0e7322	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	1.00	14.21	35.00	14.21	35.00	20.79	\N	2026-06-04 22:32:48.476204+00
317	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-06-04 23:11:46.420716+00
318	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	661923c8-ea64-4fd8-9d57-65cb523dd4c4	6	1.00	28.30	90.00	28.30	90.00	61.70	\N	2026-06-04 23:11:58.994688+00
319	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	8d04bbf2-bedd-471c-9fd4-7558e00dc514	5	1.00	22.35	49.00	22.35	49.00	26.65	\N	2026-06-04 23:12:09.846422+00
320	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	f30b3e28-f290-4954-b818-0a608fa7c654	5	2.00	33.30	58.00	66.60	116.00	49.40	\N	2026-06-04 23:12:42.469717+00
321	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	3.00	45.17	79.00	135.51	237.00	101.49	\N	2026-06-04 23:12:51.285144+00
322	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-06-04 23:13:19.030004+00
323	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	c14aabde-93dc-44a2-a114-dce69171b34a	5	4.00	9.00	29.00	36.00	116.00	80.00	\N	2026-06-04 23:13:39.256388+00
324	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	8dc91077-0b13-42d7-9058-aade2d77d050	5	1.00	15.80	38.00	15.80	38.00	22.20	\N	2026-06-04 23:13:46.797988+00
325	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	23.31	49.00	23.31	49.00	25.69	\N	2026-06-04 23:14:04.296308+00
326	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-06-04 23:14:16.706778+00
327	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	aad92148-7c3e-4d29-a9ed-ddbfabf6f658	5	1.00	12.50	35.00	12.50	35.00	22.50	\N	2026-06-04 23:14:30.90937+00
328	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	1.00	21.22	45.00	21.22	45.00	23.78	\N	2026-06-04 23:14:45.01709+00
329	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	e83eb1a4-44c3-46aa-8bd7-0c2e39ac2b3b	6	1.00	36.73	59.00	36.73	59.00	22.27	\N	2026-06-04 23:15:23.437094+00
330	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	2.00	24.00	49.00	48.00	98.00	50.00	\N	2026-06-04 23:15:38.50309+00
331	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	1.00	12.00	35.00	12.00	35.00	23.00	\N	2026-06-04 23:15:49.61486+00
332	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	2.00	18.30	40.00	36.60	80.00	43.40	\N	2026-06-04 23:16:05.022191+00
333	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	128b1a35-a215-4fc0-b2f9-6e583b761b37	17	1.00	35.00	60.00	35.00	60.00	25.00	\N	2026-06-04 23:16:36.273139+00
334	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-06-04 23:16:57.597462+00
335	dc0490a5-ab35-40d0-8c1e-5ca428165783	f54074c2-1016-4e74-a381-4d0e19996e66	17	1.00	32.00	55.00	32.00	55.00	23.00	\N	2026-06-04 23:36:45.185731+00
336	dc0490a5-ab35-40d0-8c1e-5ca428165783	e8c778cf-73f2-4435-8456-2ba5b2dad405	16	2.00	25.50	40.00	51.00	80.00	29.00	\N	2026-06-04 23:37:00.227954+00
337	dc0490a5-ab35-40d0-8c1e-5ca428165783	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-06-04 23:37:12.875284+00
338	dc0490a5-ab35-40d0-8c1e-5ca428165783	8d04bbf2-bedd-471c-9fd4-7558e00dc514	5	1.00	22.35	49.00	22.35	49.00	26.65	\N	2026-06-04 23:37:28.050491+00
339	dc0490a5-ab35-40d0-8c1e-5ca428165783	b5837a55-eb70-4f28-8745-1a52bb9c26dd	6	1.00	15.00	35.00	15.00	35.00	20.00	\N	2026-06-04 23:37:46.248664+00
340	dc0490a5-ab35-40d0-8c1e-5ca428165783	13237c2d-dd72-4480-b274-670fa6fc511d	7	1.00	24.45	59.00	24.45	59.00	34.55	\N	2026-06-04 23:37:50.057822+00
341	dc0490a5-ab35-40d0-8c1e-5ca428165783	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	2.00	21.22	45.00	42.44	90.00	47.56	\N	2026-06-04 23:38:12.963929+00
342	dc0490a5-ab35-40d0-8c1e-5ca428165783	f54074c2-1016-4e74-a381-4d0e19996e66	17	3.00	32.00	55.00	96.00	165.00	69.00	\N	2026-06-04 23:38:28.45636+00
343	dc0490a5-ab35-40d0-8c1e-5ca428165783	e83eb1a4-44c3-46aa-8bd7-0c2e39ac2b3b	6	1.00	36.73	59.00	36.73	59.00	22.27	\N	2026-06-04 23:39:05.110694+00
344	dc0490a5-ab35-40d0-8c1e-5ca428165783	4d7e7597-1fbd-4c47-98d7-b1f039bf6d69	17	1.00	50.00	79.00	50.00	79.00	29.00	\N	2026-06-04 23:39:57.476624+00
345	ddb771af-2a31-4254-a25b-ec32ab5d4978	24da1a73-59fa-4b9d-9fd8-ca5715ae964b	8	1.00	64.66	99.00	64.66	99.00	34.34	\N	2026-06-09 22:01:40.388434+00
346	ddb771af-2a31-4254-a25b-ec32ab5d4978	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-06-09 22:01:57.90614+00
347	ddb771af-2a31-4254-a25b-ec32ab5d4978	f30b3e28-f290-4954-b818-0a608fa7c654	5	2.00	33.30	58.00	66.60	116.00	49.40	\N	2026-06-09 22:02:05.999602+00
348	ddb771af-2a31-4254-a25b-ec32ab5d4978	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	1.00	37.77	75.00	37.77	75.00	37.23	\N	2026-06-09 22:02:22.329704+00
349	ddb771af-2a31-4254-a25b-ec32ab5d4978	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-06-09 22:02:33.522748+00
350	ddb771af-2a31-4254-a25b-ec32ab5d4978	369e5cbb-e9e9-489a-8e4e-3a0550be53a0	6	1.00	24.62	49.00	24.62	49.00	24.38	\N	2026-06-09 22:02:47.341847+00
351	ddb771af-2a31-4254-a25b-ec32ab5d4978	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	2.00	24.00	49.00	48.00	98.00	50.00	\N	2026-06-09 22:03:02.31405+00
352	ddb771af-2a31-4254-a25b-ec32ab5d4978	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-06-09 22:03:11.488472+00
353	ddb771af-2a31-4254-a25b-ec32ab5d4978	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	2.00	14.21	35.00	28.42	70.00	41.58	\N	2026-06-09 22:03:24.692551+00
354	ddb771af-2a31-4254-a25b-ec32ab5d4978	10ea1108-3a24-4991-a32b-c5523ead4e83	6	3.00	23.90	49.00	71.70	147.00	75.30	\N	2026-06-09 22:03:40.927491+00
355	ddb771af-2a31-4254-a25b-ec32ab5d4978	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	4.00	18.30	40.00	73.20	160.00	86.80	\N	2026-06-09 22:04:00.059912+00
356	ddb771af-2a31-4254-a25b-ec32ab5d4978	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-06-09 22:04:10.261285+00
357	ddb771af-2a31-4254-a25b-ec32ab5d4978	34d9c074-bebe-4b26-b684-1a621789839a	5	1.00	32.00	55.00	32.00	55.00	23.00	\N	2026-06-09 22:04:20.56507+00
358	ddb771af-2a31-4254-a25b-ec32ab5d4978	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	1.00	25.02	49.00	25.02	49.00	23.98	\N	2026-06-09 22:04:36.912887+00
359	ddb771af-2a31-4254-a25b-ec32ab5d4978	5d1cca77-abc8-48c5-8ed0-3acf0222f498	8	2.00	26.67	55.00	53.34	110.00	56.66	\N	2026-06-09 22:05:09.036963+00
360	ddb771af-2a31-4254-a25b-ec32ab5d4978	5d74fdb6-8507-4f0e-b202-7c064095de59	5	1.00	13.90	40.00	13.90	40.00	26.10	\N	2026-06-09 22:05:18.574878+00
361	ddb771af-2a31-4254-a25b-ec32ab5d4978	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	8	1.00	45.47	75.00	45.47	75.00	29.53	\N	2026-06-09 22:05:32.803921+00
362	ddb771af-2a31-4254-a25b-ec32ab5d4978	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-06-09 22:05:44.43392+00
363	ddb771af-2a31-4254-a25b-ec32ab5d4978	63b031d6-c373-423c-9f26-35422f608369	7	1.00	30.91	50.00	30.91	50.00	19.09	\N	2026-06-09 22:06:10.877704+00
364	ddb771af-2a31-4254-a25b-ec32ab5d4978	8822ada2-0b55-450b-a960-5c79cfbc9e52	19	2.00	37.44	60.00	74.88	120.00	45.12	\N	2026-06-09 22:12:24.633016+00
365	983d4ed5-f93f-45cf-8600-07cba12982de	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	1.00	37.77	75.00	37.77	75.00	37.23	\N	2026-06-10 20:22:50.547568+00
366	983d4ed5-f93f-45cf-8600-07cba12982de	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-06-10 20:23:02.377059+00
367	983d4ed5-f93f-45cf-8600-07cba12982de	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	3.00	45.17	79.00	135.51	237.00	101.49	\N	2026-06-10 20:23:13.297321+00
368	983d4ed5-f93f-45cf-8600-07cba12982de	3d9db912-16cc-42ad-b187-93c109f4920a	6	1.00	28.00	50.00	28.00	50.00	22.00	\N	2026-06-10 20:24:06.842988+00
369	983d4ed5-f93f-45cf-8600-07cba12982de	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	5.00	30.00	49.00	150.00	245.00	95.00	\N	2026-06-10 20:24:33.081789+00
370	983d4ed5-f93f-45cf-8600-07cba12982de	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-06-10 20:24:55.300499+00
371	983d4ed5-f93f-45cf-8600-07cba12982de	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	3.00	18.00	40.00	54.00	120.00	66.00	\N	2026-06-10 20:25:08.447975+00
372	983d4ed5-f93f-45cf-8600-07cba12982de	9c0ecc03-bbc2-4723-bad8-b164194a6404	6	2.00	32.00	65.00	64.00	130.00	66.00	\N	2026-06-10 20:25:21.98347+00
373	983d4ed5-f93f-45cf-8600-07cba12982de	24da1a73-59fa-4b9d-9fd8-ca5715ae964b	8	1.00	64.66	99.00	64.66	99.00	34.34	\N	2026-06-10 20:25:35.818558+00
374	983d4ed5-f93f-45cf-8600-07cba12982de	335cd853-18c8-48ac-807c-c94ca1a20ee7	8	1.00	32.33	55.00	32.33	55.00	22.67	\N	2026-06-10 20:25:49.747602+00
375	983d4ed5-f93f-45cf-8600-07cba12982de	5a8834c8-1b56-4055-8e3c-c219b88c4571	6	1.00	23.92	49.00	23.92	49.00	25.08	\N	2026-06-10 20:26:03.351356+00
376	983d4ed5-f93f-45cf-8600-07cba12982de	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	2.00	14.21	35.00	28.42	70.00	41.58	\N	2026-06-10 20:26:18.769887+00
377	983d4ed5-f93f-45cf-8600-07cba12982de	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	4.00	8.50	35.00	34.00	140.00	106.00	\N	2026-06-10 20:26:38.445367+00
378	983d4ed5-f93f-45cf-8600-07cba12982de	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	8	1.00	45.47	75.00	45.47	75.00	29.53	\N	2026-06-10 20:26:53.768234+00
379	983d4ed5-f93f-45cf-8600-07cba12982de	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-06-10 20:27:13.400279+00
380	983d4ed5-f93f-45cf-8600-07cba12982de	f4f42db8-afea-458e-97b1-67a4026f6c6b	18	4.00	25.20	49.00	100.80	196.00	95.20	\N	2026-06-10 20:27:32.121395+00
381	983d4ed5-f93f-45cf-8600-07cba12982de	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	3.00	22.00	45.00	66.00	135.00	69.00	\N	2026-06-10 20:27:46.149188+00
382	983d4ed5-f93f-45cf-8600-07cba12982de	bc10d03f-8910-418b-9344-c5a73ebf1e05	5	1.00	16.10	35.00	16.10	35.00	18.90	\N	2026-06-10 20:27:57.999094+00
383	983d4ed5-f93f-45cf-8600-07cba12982de	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-06-10 20:28:11.426793+00
384	983d4ed5-f93f-45cf-8600-07cba12982de	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-06-10 20:28:23.877333+00
385	983d4ed5-f93f-45cf-8600-07cba12982de	aad92148-7c3e-4d29-a9ed-ddbfabf6f658	5	1.00	12.50	35.00	12.50	35.00	22.50	\N	2026-06-10 20:28:35.393929+00
386	983d4ed5-f93f-45cf-8600-07cba12982de	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-06-10 20:28:38.920656+00
387	983d4ed5-f93f-45cf-8600-07cba12982de	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-06-10 20:28:52.189167+00
388	983d4ed5-f93f-45cf-8600-07cba12982de	7e17d541-9f2e-4586-af64-dbb414c369d7	8	1.00	31.52	70.00	31.52	70.00	38.48	\N	2026-06-10 20:29:10.238778+00
389	983d4ed5-f93f-45cf-8600-07cba12982de	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	1.00	9.99	40.00	9.99	40.00	30.01	\N	2026-06-10 20:29:22.916042+00
390	983d4ed5-f93f-45cf-8600-07cba12982de	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	23.31	49.00	23.31	49.00	25.69	\N	2026-06-10 20:29:32.68625+00
391	e1bb310a-2280-48cf-b839-faf9b97e328f	24da1a73-59fa-4b9d-9fd8-ca5715ae964b	8	1.00	64.66	99.00	64.66	99.00	34.34	\N	2026-06-11 19:53:58.896837+00
392	e1bb310a-2280-48cf-b839-faf9b97e328f	335cd853-18c8-48ac-807c-c94ca1a20ee7	8	3.00	32.33	55.00	96.99	165.00	68.01	\N	2026-06-11 19:54:02.887552+00
393	e1bb310a-2280-48cf-b839-faf9b97e328f	f30b3e28-f290-4954-b818-0a608fa7c654	5	2.00	33.30	58.00	66.60	116.00	49.40	\N	2026-06-11 19:54:25.878441+00
394	e1bb310a-2280-48cf-b839-faf9b97e328f	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-06-11 19:54:36.688858+00
395	e1bb310a-2280-48cf-b839-faf9b97e328f	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-06-11 19:54:47.454622+00
396	e1bb310a-2280-48cf-b839-faf9b97e328f	20afc8d4-63b6-4cfe-b9c8-4988eda32993	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-06-11 19:54:58.742243+00
397	e1bb310a-2280-48cf-b839-faf9b97e328f	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-06-11 19:55:17.21888+00
398	e1bb310a-2280-48cf-b839-faf9b97e328f	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-06-11 19:55:30.39163+00
399	e1bb310a-2280-48cf-b839-faf9b97e328f	f4f42db8-afea-458e-97b1-67a4026f6c6b	18	1.00	25.87	49.00	25.87	49.00	23.13	\N	2026-06-11 19:55:44.491249+00
400	e1bb310a-2280-48cf-b839-faf9b97e328f	5d1cca77-abc8-48c5-8ed0-3acf0222f498	8	1.00	26.67	55.00	26.67	55.00	28.33	\N	2026-06-11 19:55:57.981309+00
401	e1bb310a-2280-48cf-b839-faf9b97e328f	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-06-11 19:56:09.998716+00
402	e1bb310a-2280-48cf-b839-faf9b97e328f	369e5cbb-e9e9-489a-8e4e-3a0550be53a0	6	1.00	24.62	49.00	24.62	49.00	24.38	\N	2026-06-11 19:56:21.644442+00
403	e1bb310a-2280-48cf-b839-faf9b97e328f	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-06-11 19:56:33.374037+00
404	e1bb310a-2280-48cf-b839-faf9b97e328f	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	1.00	8.50	35.00	8.50	35.00	26.50	\N	2026-06-11 19:56:50.596275+00
405	e1bb310a-2280-48cf-b839-faf9b97e328f	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	23.31	49.00	23.31	49.00	25.69	\N	2026-06-11 19:59:11.429091+00
406	e1bb310a-2280-48cf-b839-faf9b97e328f	c6081edc-0b34-43b7-91fb-6b97bc45c534	5	1.00	19.50	39.00	19.50	39.00	19.50	\N	2026-06-11 20:00:31.614138+00
407	86d5d105-491f-4506-aa8e-17ffaf3314c7	128b1a35-a215-4fc0-b2f9-6e583b761b37	17	2.00	35.00	60.00	70.00	120.00	50.00	\N	2026-06-14 00:36:22.109958+00
408	86d5d105-491f-4506-aa8e-17ffaf3314c7	34d9c074-bebe-4b26-b684-1a621789839a	5	1.00	32.00	55.00	32.00	55.00	23.00	\N	2026-06-14 00:36:42.900745+00
409	86d5d105-491f-4506-aa8e-17ffaf3314c7	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-06-14 00:36:55.486961+00
410	86d5d105-491f-4506-aa8e-17ffaf3314c7	127b5028-a4af-4315-b2c3-d3602918a0ba	5	2.00	18.50	45.00	37.00	90.00	53.00	\N	2026-06-14 00:37:03.909318+00
411	86d5d105-491f-4506-aa8e-17ffaf3314c7	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	23.31	49.00	23.31	49.00	25.69	\N	2026-06-14 00:37:17.90841+00
412	86d5d105-491f-4506-aa8e-17ffaf3314c7	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	1.00	18.00	40.00	18.00	40.00	22.00	\N	2026-06-14 00:37:26.277332+00
413	86d5d105-491f-4506-aa8e-17ffaf3314c7	8822ada2-0b55-450b-a960-5c79cfbc9e52	19	1.00	37.44	60.00	37.44	60.00	22.56	\N	2026-06-14 00:37:51.343489+00
414	86d5d105-491f-4506-aa8e-17ffaf3314c7	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	8	2.00	45.47	75.00	90.94	150.00	59.06	\N	2026-06-14 00:38:04.459668+00
415	86d5d105-491f-4506-aa8e-17ffaf3314c7	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	2.00	24.00	49.00	48.00	98.00	50.00	\N	2026-06-14 00:38:18.645414+00
416	86d5d105-491f-4506-aa8e-17ffaf3314c7	369e5cbb-e9e9-489a-8e4e-3a0550be53a0	6	1.00	24.62	49.00	24.62	49.00	24.38	\N	2026-06-14 00:38:29.75514+00
417	86d5d105-491f-4506-aa8e-17ffaf3314c7	7e17d541-9f2e-4586-af64-dbb414c369d7	8	1.00	31.52	70.00	31.52	70.00	38.48	\N	2026-06-14 00:38:49.5695+00
418	86d5d105-491f-4506-aa8e-17ffaf3314c7	c9bd1e8e-7666-4002-ac41-16b2a1103d6a	8	1.00	35.16	75.00	35.16	75.00	39.84	\N	2026-06-14 00:38:55.269987+00
419	86d5d105-491f-4506-aa8e-17ffaf3314c7	432a5a7b-c6ca-4d6b-bcdb-1d1c40b5cb2a	5	1.00	15.72	39.00	15.72	39.00	23.28	\N	2026-06-14 00:39:09.025264+00
420	86d5d105-491f-4506-aa8e-17ffaf3314c7	5d1cca77-abc8-48c5-8ed0-3acf0222f498	8	1.00	26.67	55.00	26.67	55.00	28.33	\N	2026-06-14 00:39:28.454163+00
421	86d5d105-491f-4506-aa8e-17ffaf3314c7	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-06-14 00:39:36.892321+00
422	86d5d105-491f-4506-aa8e-17ffaf3314c7	fd98f68d-6e36-43c9-b918-248065a6425d	\N	1.00	50.00	99.00	50.00	99.00	49.00	\N	2026-06-14 00:41:19.888778+00
423	cb005a65-26a0-4081-8cda-95f93ee599f6	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-06-16 01:19:41.513918+00
425	cb005a65-26a0-4081-8cda-95f93ee599f6	8822ada2-0b55-450b-a960-5c79cfbc9e52	19	2.00	37.44	60.00	74.88	120.00	45.12	\N	2026-06-16 01:20:13.779602+00
426	cb005a65-26a0-4081-8cda-95f93ee599f6	20afc8d4-63b6-4cfe-b9c8-4988eda32993	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-06-16 01:20:31.842017+00
427	cb005a65-26a0-4081-8cda-95f93ee599f6	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-06-16 01:20:47.55506+00
428	cb005a65-26a0-4081-8cda-95f93ee599f6	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-06-16 01:21:02.025327+00
429	cb005a65-26a0-4081-8cda-95f93ee599f6	f4f42db8-afea-458e-97b1-67a4026f6c6b	18	1.00	25.87	49.00	25.87	49.00	23.13	\N	2026-06-16 01:21:12.846239+00
474	800be390-8b9f-41ac-8a66-ba77fceb9656	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	55.00	26.55	55.00	28.45	\N	2026-06-18 22:35:28.790483+00
424	cb005a65-26a0-4081-8cda-95f93ee599f6	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	3.00	45.17	79.00	135.51	237.00	101.49	\N	2026-06-16 01:19:47.138696+00
430	cb005a65-26a0-4081-8cda-95f93ee599f6	3d9db912-16cc-42ad-b187-93c109f4920a	6	1.00	28.00	50.00	28.00	50.00	22.00	\N	2026-06-16 09:22:24.832942+00
431	cb005a65-26a0-4081-8cda-95f93ee599f6	65c8da1f-3970-46b3-887b-cf6308c80ea6	8	1.00	24.67	49.00	24.67	49.00	24.33	\N	2026-06-16 09:22:33.591058+00
432	cb005a65-26a0-4081-8cda-95f93ee599f6	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-06-16 09:22:51.478226+00
433	cb005a65-26a0-4081-8cda-95f93ee599f6	62517356-0463-402d-bc31-940f9a522238	6	1.00	31.10	63.00	31.10	63.00	31.90	\N	2026-06-16 09:23:02.046043+00
434	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-06-16 21:07:30.34554+00
435	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	6.00	18.30	40.00	109.80	240.00	130.20	\N	2026-06-16 21:07:45.215943+00
436	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	23.31	49.00	23.31	49.00	25.69	\N	2026-06-16 21:07:59.688359+00
437	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	8822ada2-0b55-450b-a960-5c79cfbc9e52	19	1.00	37.44	60.00	37.44	60.00	22.56	\N	2026-06-16 21:08:17.816244+00
438	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	81cd4fbc-60f3-4d2e-8257-04de4fac8034	6	1.00	19.64	45.00	19.64	45.00	25.36	\N	2026-06-16 21:08:24.489774+00
439	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	50e7a3a2-ebd7-48f9-95ae-6f878fc5e166	17	2.00	37.33	60.00	74.66	120.00	45.34	\N	2026-06-16 21:08:32.20197+00
440	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-06-16 21:08:49.533744+00
441	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-06-16 21:09:02.559279+00
442	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-06-16 21:09:06.571848+00
443	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	40ba9005-5b3d-4db4-a0c7-ddc11b9b578b	17	1.00	33.00	55.00	33.00	55.00	22.00	\N	2026-06-16 21:09:18.475289+00
444	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	2.00	18.00	40.00	36.00	80.00	44.00	\N	2026-06-16 21:09:31.266007+00
445	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	e06a31e8-ac5e-4b3d-8524-7f0da4869b72	17	3.00	33.00	55.00	99.00	165.00	66.00	\N	2026-06-16 21:09:50.246717+00
446	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	f4f42db8-afea-458e-97b1-67a4026f6c6b	18	3.00	25.87	49.00	77.61	147.00	69.39	\N	2026-06-16 21:10:07.39263+00
447	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	f54074c2-1016-4e74-a381-4d0e19996e66	17	1.00	32.00	55.00	32.00	55.00	23.00	\N	2026-06-16 21:10:36.622201+00
448	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	9bc794ac-8e74-42e6-a559-c656bc3e732c	6	1.00	26.64	65.00	26.64	65.00	38.36	\N	2026-06-16 21:10:55.370183+00
449	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	4ea61f2a-96e4-417a-a994-3ca4aca6863a	7	1.00	27.50	59.00	27.50	59.00	31.50	\N	2026-06-16 21:11:08.330452+00
450	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	ce5eb1c3-05b4-446c-bd6d-2ecfee916391	7	2.00	19.40	45.00	38.80	90.00	51.20	\N	2026-06-16 21:11:17.61534+00
451	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	aba4027c-0b08-4926-8032-b50ea281345e	17	1.00	33.00	55.00	33.00	55.00	22.00	\N	2026-06-16 21:11:57.210942+00
452	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	62517356-0463-402d-bc31-940f9a522238	6	1.00	31.10	63.00	31.10	63.00	31.90	\N	2026-06-16 21:12:12.744113+00
453	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	55.00	26.55	55.00	28.45	\N	2026-06-16 21:12:21.134398+00
454	da89c6e0-839f-481d-ae61-f977b271577e	aba4027c-0b08-4926-8032-b50ea281345e	17	2.00	33.00	55.00	66.00	110.00	44.00	\N	2026-06-17 23:16:02.222821+00
455	da89c6e0-839f-481d-ae61-f977b271577e	5d74fdb6-8507-4f0e-b202-7c064095de59	5	2.00	13.90	40.00	27.80	80.00	52.20	\N	2026-06-17 23:16:20.882825+00
456	da89c6e0-839f-481d-ae61-f977b271577e	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	4.00	18.00	40.00	72.00	160.00	88.00	\N	2026-06-17 23:16:31.865667+00
457	da89c6e0-839f-481d-ae61-f977b271577e	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-06-17 23:16:47.857201+00
458	da89c6e0-839f-481d-ae61-f977b271577e	c9bd1e8e-7666-4002-ac41-16b2a1103d6a	8	1.00	35.16	75.00	35.16	75.00	39.84	\N	2026-06-17 23:17:00.582572+00
459	da89c6e0-839f-481d-ae61-f977b271577e	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	1.00	25.02	49.00	25.02	49.00	23.98	\N	2026-06-17 23:17:16.086796+00
460	da89c6e0-839f-481d-ae61-f977b271577e	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-06-17 23:17:32.529551+00
461	da89c6e0-839f-481d-ae61-f977b271577e	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	23.31	49.00	23.31	49.00	25.69	\N	2026-06-17 23:17:45.256944+00
462	da89c6e0-839f-481d-ae61-f977b271577e	e06a31e8-ac5e-4b3d-8524-7f0da4869b72	17	1.00	33.00	55.00	33.00	55.00	22.00	\N	2026-06-17 23:17:58.321913+00
463	da89c6e0-839f-481d-ae61-f977b271577e	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-06-17 23:18:12.377652+00
464	da89c6e0-839f-481d-ae61-f977b271577e	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-06-17 23:18:21.93239+00
465	da89c6e0-839f-481d-ae61-f977b271577e	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-06-17 23:18:35.65138+00
466	da89c6e0-839f-481d-ae61-f977b271577e	3d9db912-16cc-42ad-b187-93c109f4920a	6	1.00	28.00	50.00	28.00	50.00	22.00	\N	2026-06-17 23:19:05.728954+00
467	800be390-8b9f-41ac-8a66-ba77fceb9656	7d672959-251c-49e9-ab25-b236d9b1b2ec	5	1.00	19.59	45.00	19.59	45.00	25.41	\N	2026-06-18 22:33:39.282669+00
468	800be390-8b9f-41ac-8a66-ba77fceb9656	91e47043-a834-49e0-9a32-c816b23bda36	5	1.00	33.85	65.00	33.85	65.00	31.15	\N	2026-06-18 22:33:50.008135+00
469	800be390-8b9f-41ac-8a66-ba77fceb9656	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	1.00	24.05	49.00	24.05	49.00	24.95	\N	2026-06-18 22:34:10.380485+00
470	800be390-8b9f-41ac-8a66-ba77fceb9656	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	2.00	18.30	40.00	36.60	80.00	43.40	\N	2026-06-18 22:34:19.02377+00
471	800be390-8b9f-41ac-8a66-ba77fceb9656	c9bd1e8e-7666-4002-ac41-16b2a1103d6a	8	1.00	35.16	75.00	35.16	75.00	39.84	\N	2026-06-18 22:34:36.399025+00
472	800be390-8b9f-41ac-8a66-ba77fceb9656	dc9fb3b6-9881-438a-beb5-5b01878ff0d0	17	2.00	30.00	59.00	60.00	118.00	58.00	\N	2026-06-18 22:34:52.542299+00
473	800be390-8b9f-41ac-8a66-ba77fceb9656	f54074c2-1016-4e74-a381-4d0e19996e66	17	2.00	32.00	55.00	64.00	110.00	46.00	\N	2026-06-18 22:35:11.507952+00
475	800be390-8b9f-41ac-8a66-ba77fceb9656	06137af0-4bd9-4eac-93da-7ccfd6195fdf	5	1.00	17.50	40.00	17.50	40.00	22.50	\N	2026-06-18 22:35:35.979596+00
476	800be390-8b9f-41ac-8a66-ba77fceb9656	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	1.00	8.50	35.00	8.50	35.00	26.50	\N	2026-06-18 22:35:49.785314+00
477	800be390-8b9f-41ac-8a66-ba77fceb9656	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	1.00	18.00	40.00	18.00	40.00	22.00	\N	2026-06-18 22:36:01.556424+00
478	800be390-8b9f-41ac-8a66-ba77fceb9656	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	1.00	25.02	49.00	25.02	49.00	23.98	\N	2026-06-18 22:36:14.578607+00
479	800be390-8b9f-41ac-8a66-ba77fceb9656	aba4027c-0b08-4926-8032-b50ea281345e	17	1.00	33.00	55.00	33.00	55.00	22.00	\N	2026-06-18 22:36:23.182004+00
480	800be390-8b9f-41ac-8a66-ba77fceb9656	5d1cca77-abc8-48c5-8ed0-3acf0222f498	8	1.00	26.67	55.00	26.67	55.00	28.33	\N	2026-06-18 22:36:44.521239+00
481	800be390-8b9f-41ac-8a66-ba77fceb9656	127b5028-a4af-4315-b2c3-d3602918a0ba	5	2.00	18.50	45.00	37.00	90.00	53.00	\N	2026-06-18 22:36:54.668066+00
\.


--
-- Data for Name: itens_venda_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.itens_venda_backup_20260523 (id, venda_id, produto_id, fornecedor_id, quantidade, preco_custo, preco_venda, subtotal_custo, subtotal_venda, lucro, observacao, created_at) FROM stdin;
28	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	3fb2bcc6-66a1-48f7-9f44-4303bcbd42c8	6	1.00	76.81	190.00	76.81	190.00	113.19	\N	2026-05-15 21:19:54.887019+00
29	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	91e47043-a834-49e0-9a32-c816b23bda36	5	1.00	33.85	65.00	33.85	65.00	31.15	\N	2026-05-15 21:37:54.087035+00
30	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	22.20	45.00	22.20	45.00	22.80	\N	2026-05-15 21:38:07.350925+00
31	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-15 21:38:23.641292+00
32	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-15 21:38:36.57618+00
33	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	13194c47-554b-47d8-9364-1a4e5eacf24b	\N	1.00	20.70	45.00	20.70	45.00	24.30	\N	2026-05-15 21:38:50.692467+00
35	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-15 21:40:34.262047+00
34	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-15 21:40:22.771552+00
36	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	63b031d6-c373-423c-9f26-35422f608369	7	1.00	24.05	50.00	24.05	50.00	25.95	\N	2026-05-15 22:03:35.83122+00
37	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-15 22:04:03.262458+00
38	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-15 22:04:20.416774+00
39	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	0487055c-6183-45da-a5ff-9c46c8ede331	6	1.00	27.05	49.00	27.05	49.00	21.95	\N	2026-05-15 22:04:32.320107+00
40	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	20afc8d4-63b6-4cfe-b9c8-4988eda32993	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-15 22:04:41.027939+00
41	22be0b61-a8c9-4e27-8aea-ca96bb00ab82	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-15 22:04:49.473792+00
42	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-15 23:31:55.788351+00
43	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-15 23:32:15.93773+00
44	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	3d9db912-16cc-42ad-b187-93c109f4920a	6	1.00	28.00	50.00	28.00	50.00	22.00	\N	2026-05-15 23:32:48.652872+00
45	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	1.00	12.99	35.00	12.99	35.00	22.01	\N	2026-05-15 23:32:55.108854+00
46	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-15 23:33:08.859298+00
47	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	1f300abf-904d-4b4e-ad3e-b354d0e37310	6	1.00	17.65	40.00	17.65	40.00	22.35	\N	2026-05-15 23:33:20.200835+00
48	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	f30b3e28-f290-4954-b818-0a608fa7c654	5	3.00	33.30	58.00	99.90	174.00	74.10	\N	2026-05-15 23:33:38.124239+00
49	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	2.00	24.00	49.00	48.00	98.00	50.00	\N	2026-05-15 23:33:49.072265+00
50	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	20afc8d4-63b6-4cfe-b9c8-4988eda32993	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-15 23:34:02.18597+00
51	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	50.00	26.55	50.00	23.45	\N	2026-05-15 23:34:12.44284+00
52	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	2.00	24.00	49.00	48.00	98.00	50.00	\N	2026-05-15 23:35:50.156966+00
54	00f90737-4a74-4eb1-93fe-d09eddf2b8ed	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	22.20	45.00	22.20	45.00	22.80	\N	2026-05-15 23:48:18.347911+00
55	9a97508b-6c4f-41e0-a489-6a329392730a	b5837a55-eb70-4f28-8745-1a52bb9c26dd	6	1.00	15.00	35.00	15.00	35.00	20.00	\N	2026-05-15 23:57:12.953332+00
56	9a97508b-6c4f-41e0-a489-6a329392730a	1f300abf-904d-4b4e-ad3e-b354d0e37310	6	1.00	17.65	40.00	17.65	40.00	22.35	\N	2026-05-15 23:57:25.768163+00
57	9a97508b-6c4f-41e0-a489-6a329392730a	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	2.00	18.00	40.00	36.00	80.00	44.00	\N	2026-05-15 23:57:36.832586+00
58	9a97508b-6c4f-41e0-a489-6a329392730a	127b5028-a4af-4315-b2c3-d3602918a0ba	5	3.00	18.50	45.00	55.50	135.00	79.50	\N	2026-05-15 23:57:50.582186+00
59	9a97508b-6c4f-41e0-a489-6a329392730a	b2b3aedd-b78c-4e74-bea2-a76c94462fb0	6	1.00	28.86	55.00	28.86	55.00	26.14	\N	2026-05-15 23:58:14.645862+00
60	9a97508b-6c4f-41e0-a489-6a329392730a	91e47043-a834-49e0-9a32-c816b23bda36	5	1.00	33.85	65.00	33.85	65.00	31.15	\N	2026-05-15 23:58:36.31609+00
61	9a97508b-6c4f-41e0-a489-6a329392730a	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-15 23:59:01.829889+00
53	00f90737-4a74-4eb1-93fe-d09eddf2b8ed	00e43702-47b9-48b7-b792-a0b68c8b59c1	8	4.00	14.09	39.00	56.36	156.00	99.64	\N	2026-05-15 23:48:07.051485+00
62	9a97508b-6c4f-41e0-a489-6a329392730a	7dee94ab-acfb-4afb-870f-f66f1de95b58	5	1.00	21.45	50.00	21.45	50.00	28.55	\N	2026-05-16 00:00:25.116729+00
63	9a97508b-6c4f-41e0-a489-6a329392730a	0487055c-6183-45da-a5ff-9c46c8ede331	6	1.00	27.05	49.00	27.05	49.00	21.95	\N	2026-05-16 00:00:34.164579+00
64	9a97508b-6c4f-41e0-a489-6a329392730a	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	3.00	21.22	45.00	63.66	135.00	71.34	\N	2026-05-16 00:00:48.847269+00
65	9a97508b-6c4f-41e0-a489-6a329392730a	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-16 00:00:58.864388+00
66	9a97508b-6c4f-41e0-a489-6a329392730a	4338276c-f346-4802-8341-51112846bce7	8	1.00	41.23	75.00	41.23	75.00	33.77	\N	2026-05-16 00:01:21.420311+00
67	4549c2f2-ed62-457a-b494-a016634abe36	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-05-16 00:20:36.3372+00
68	4549c2f2-ed62-457a-b494-a016634abe36	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-16 00:20:50.485017+00
69	4549c2f2-ed62-457a-b494-a016634abe36	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	2.00	30.83	60.00	61.66	120.00	58.34	\N	2026-05-16 00:21:03.380574+00
70	4549c2f2-ed62-457a-b494-a016634abe36	7dee94ab-acfb-4afb-870f-f66f1de95b58	5	1.00	21.45	50.00	21.45	50.00	28.55	\N	2026-05-16 00:21:25.686532+00
71	4549c2f2-ed62-457a-b494-a016634abe36	c9bd1e8e-7666-4002-ac41-16b2a1103d6a	8	1.00	40.00	75.00	40.00	75.00	35.00	\N	2026-05-16 00:21:40.527534+00
72	4549c2f2-ed62-457a-b494-a016634abe36	0487055c-6183-45da-a5ff-9c46c8ede331	6	2.00	27.05	49.00	54.10	98.00	43.90	\N	2026-05-16 00:21:54.006285+00
73	4549c2f2-ed62-457a-b494-a016634abe36	51ffc4d4-e18f-427a-9166-a5e75ec5c139	6	1.00	40.00	65.00	40.00	65.00	25.00	\N	2026-05-16 00:22:07.166097+00
74	4549c2f2-ed62-457a-b494-a016634abe36	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	50.00	26.55	50.00	23.45	\N	2026-05-16 00:22:19.684448+00
75	4549c2f2-ed62-457a-b494-a016634abe36	64c86f31-7d91-45bb-8b62-13e7116699f8	5	1.00	25.65	55.00	25.65	55.00	29.35	\N	2026-05-16 00:22:29.87966+00
76	4549c2f2-ed62-457a-b494-a016634abe36	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-16 00:22:58.170417+00
77	4549c2f2-ed62-457a-b494-a016634abe36	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	1.00	12.00	35.00	12.00	35.00	23.00	\N	2026-05-16 00:23:10.933712+00
78	4549c2f2-ed62-457a-b494-a016634abe36	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-05-16 00:23:22.095736+00
79	4549c2f2-ed62-457a-b494-a016634abe36	91e47043-a834-49e0-9a32-c816b23bda36	5	1.00	33.85	65.00	33.85	65.00	31.15	\N	2026-05-16 00:23:33.112887+00
80	4549c2f2-ed62-457a-b494-a016634abe36	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-16 00:23:43.287726+00
81	b81f4153-6d87-4cec-990d-1640330ad6e3	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	1.00	9.99	40.00	9.99	40.00	30.01	\N	2026-05-16 02:08:00.694545+00
82	b81f4153-6d87-4cec-990d-1640330ad6e3	8d04bbf2-bedd-471c-9fd4-7558e00dc514	5	1.00	22.35	49.00	22.35	49.00	26.65	\N	2026-05-16 02:08:08.802267+00
83	b81f4153-6d87-4cec-990d-1640330ad6e3	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-16 02:08:23.772902+00
84	b81f4153-6d87-4cec-990d-1640330ad6e3	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-16 02:08:28.836655+00
85	b81f4153-6d87-4cec-990d-1640330ad6e3	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-16 02:08:41.771485+00
86	b81f4153-6d87-4cec-990d-1640330ad6e3	ce5eb1c3-05b4-446c-bd6d-2ecfee916391	7	1.00	19.40	45.00	19.40	45.00	25.60	\N	2026-05-16 02:08:53.976586+00
87	b81f4153-6d87-4cec-990d-1640330ad6e3	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-16 02:09:05.876038+00
88	b81f4153-6d87-4cec-990d-1640330ad6e3	0f66560d-f5f4-448a-8f92-f38557369c58	6	1.00	22.20	45.00	22.20	45.00	22.80	\N	2026-05-16 02:09:17.09572+00
89	b81f4153-6d87-4cec-990d-1640330ad6e3	b7d0920b-f6b4-45f5-b232-ecf138c4cb1e	6	1.00	20.27	49.00	20.27	49.00	28.73	\N	2026-05-16 02:09:29.68234+00
90	b81f4153-6d87-4cec-990d-1640330ad6e3	f30b3e28-f290-4954-b818-0a608fa7c654	5	2.00	33.30	58.00	66.60	116.00	49.40	\N	2026-05-16 02:09:41.414845+00
91	b81f4153-6d87-4cec-990d-1640330ad6e3	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-05-16 02:09:53.332022+00
92	b81f4153-6d87-4cec-990d-1640330ad6e3	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-05-16 02:10:03.927668+00
93	b81f4153-6d87-4cec-990d-1640330ad6e3	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-16 02:10:12.115097+00
94	b81f4153-6d87-4cec-990d-1640330ad6e3	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	2.00	21.22	45.00	42.44	90.00	47.56	\N	2026-05-16 02:10:25.149078+00
95	b81f4153-6d87-4cec-990d-1640330ad6e3	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	1.00	24.05	49.00	24.05	49.00	24.95	\N	2026-05-16 02:10:38.178826+00
96	e586b75f-0f41-4998-a4b2-c2667765f1b5	65c8da1f-3970-46b3-887b-cf6308c80ea6	8	3.00	24.67	49.00	74.01	147.00	72.99	\N	2026-05-16 20:55:04.262539+00
98	e586b75f-0f41-4998-a4b2-c2667765f1b5	b7d0920b-f6b4-45f5-b232-ecf138c4cb1e	6	1.00	20.27	49.00	20.27	49.00	28.73	\N	2026-05-16 20:55:58.433281+00
99	e586b75f-0f41-4998-a4b2-c2667765f1b5	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	3.00	22.00	45.00	66.00	135.00	69.00	\N	2026-05-16 20:56:17.327912+00
100	e586b75f-0f41-4998-a4b2-c2667765f1b5	163eed67-dfa7-47cb-bb26-72f6633f59cf	5	1.00	18.15	45.00	18.15	45.00	26.85	\N	2026-05-16 20:56:27.327151+00
101	e586b75f-0f41-4998-a4b2-c2667765f1b5	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-16 20:56:40.012301+00
102	e586b75f-0f41-4998-a4b2-c2667765f1b5	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	2.00	24.05	49.00	48.10	98.00	49.90	\N	2026-05-16 20:56:47.973539+00
103	e586b75f-0f41-4998-a4b2-c2667765f1b5	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-16 20:57:13.556548+00
104	e586b75f-0f41-4998-a4b2-c2667765f1b5	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	1.00	12.99	35.00	12.99	35.00	22.01	\N	2026-05-16 20:57:26.279123+00
105	e586b75f-0f41-4998-a4b2-c2667765f1b5	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	3.00	30.00	49.00	90.00	147.00	57.00	\N	2026-05-16 20:57:42.524452+00
106	e586b75f-0f41-4998-a4b2-c2667765f1b5	b2b3aedd-b78c-4e74-bea2-a76c94462fb0	6	1.00	28.86	55.00	28.86	55.00	26.14	\N	2026-05-16 20:57:52.805097+00
107	e586b75f-0f41-4998-a4b2-c2667765f1b5	06137af0-4bd9-4eac-93da-7ccfd6195fdf	5	1.00	17.50	40.00	17.50	40.00	22.50	\N	2026-05-16 20:58:02.284395+00
108	e586b75f-0f41-4998-a4b2-c2667765f1b5	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-16 20:58:11.063547+00
109	e586b75f-0f41-4998-a4b2-c2667765f1b5	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-05-16 20:58:19.551771+00
110	e586b75f-0f41-4998-a4b2-c2667765f1b5	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-16 20:58:31.569069+00
111	e586b75f-0f41-4998-a4b2-c2667765f1b5	62517356-0463-402d-bc31-940f9a522238	6	2.00	31.10	59.00	62.20	118.00	55.80	\N	2026-05-16 20:58:43.103313+00
112	e586b75f-0f41-4998-a4b2-c2667765f1b5	4338276c-f346-4802-8341-51112846bce7	8	1.00	41.23	75.00	41.23	75.00	33.77	\N	2026-05-16 20:58:52.067099+00
113	e586b75f-0f41-4998-a4b2-c2667765f1b5	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	1.00	18.00	40.00	18.00	40.00	22.00	\N	2026-05-16 20:59:05.579805+00
114	e586b75f-0f41-4998-a4b2-c2667765f1b5	c14aabde-93dc-44a2-a114-dce69171b34a	5	4.00	9.00	29.00	36.00	116.00	80.00	\N	2026-05-16 20:59:19.23521+00
115	e586b75f-0f41-4998-a4b2-c2667765f1b5	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-16 21:00:20.646896+00
116	e586b75f-0f41-4998-a4b2-c2667765f1b5	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-05-16 21:00:37.520268+00
117	e586b75f-0f41-4998-a4b2-c2667765f1b5	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	2.00	37.77	75.00	75.54	150.00	74.46	\N	2026-05-16 21:02:34.048535+00
118	e586b75f-0f41-4998-a4b2-c2667765f1b5	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-05-16 21:04:04.513197+00
119	e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	2.00	22.00	45.00	44.00	90.00	46.00	\N	2026-05-17 11:24:08.87668+00
121	a55382f4-8593-4d38-925c-b868fadc1edb	64c86f31-7d91-45bb-8b62-13e7116699f8	5	1.00	25.65	55.00	25.65	55.00	29.35	\N	2026-05-17 13:09:36.252673+00
122	a55382f4-8593-4d38-925c-b868fadc1edb	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-17 13:09:49.85359+00
123	a55382f4-8593-4d38-925c-b868fadc1edb	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-17 13:10:07.068569+00
124	a55382f4-8593-4d38-925c-b868fadc1edb	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-17 13:10:12.292029+00
125	a55382f4-8593-4d38-925c-b868fadc1edb	3d9db912-16cc-42ad-b187-93c109f4920a	6	1.00	28.00	50.00	28.00	50.00	22.00	\N	2026-05-17 13:10:32.000364+00
126	a55382f4-8593-4d38-925c-b868fadc1edb	cbb800c0-c5bf-4961-9025-6524a4d5488f	5	1.00	12.99	35.00	12.99	35.00	22.01	\N	2026-05-17 13:10:51.33264+00
127	a55382f4-8593-4d38-925c-b868fadc1edb	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-17 13:11:00.312145+00
128	a55382f4-8593-4d38-925c-b868fadc1edb	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-17 13:11:11.822699+00
129	a55382f4-8593-4d38-925c-b868fadc1edb	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-17 13:11:38.996587+00
130	a55382f4-8593-4d38-925c-b868fadc1edb	d9168dbf-8847-42aa-8339-3fb00d6d1708	5	1.00	36.80	58.00	36.80	58.00	21.20	\N	2026-05-17 13:11:54.678723+00
131	a55382f4-8593-4d38-925c-b868fadc1edb	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	50.00	26.55	50.00	23.45	\N	2026-05-17 13:12:07.824571+00
132	a55382f4-8593-4d38-925c-b868fadc1edb	ce5eb1c3-05b4-446c-bd6d-2ecfee916391	7	1.00	19.40	45.00	19.40	45.00	25.60	\N	2026-05-17 13:12:19.449559+00
133	a55382f4-8593-4d38-925c-b868fadc1edb	4ea61f2a-96e4-417a-a994-3ca4aca6863a	7	1.00	27.50	59.00	27.50	59.00	31.50	\N	2026-05-17 13:12:38.594169+00
134	a55382f4-8593-4d38-925c-b868fadc1edb	34d9c074-bebe-4b26-b684-1a621789839a	5	1.00	32.00	49.00	32.00	49.00	17.00	\N	2026-05-17 13:12:50.676209+00
135	a55382f4-8593-4d38-925c-b868fadc1edb	10ea1108-3a24-4991-a32b-c5523ead4e83	6	2.00	23.90	49.00	47.80	98.00	50.20	\N	2026-05-17 13:13:07.110858+00
136	a55382f4-8593-4d38-925c-b868fadc1edb	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	2.00	30.83	60.00	61.66	120.00	58.34	\N	2026-05-17 13:13:19.014337+00
137	a55382f4-8593-4d38-925c-b868fadc1edb	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	2.00	12.00	35.00	24.00	70.00	46.00	\N	2026-05-17 13:13:26.863125+00
138	a55382f4-8593-4d38-925c-b868fadc1edb	65c8da1f-3970-46b3-887b-cf6308c80ea6	8	1.00	24.67	49.00	24.67	49.00	24.33	\N	2026-05-17 13:13:37.217929+00
139	a55382f4-8593-4d38-925c-b868fadc1edb	beccb773-eb87-44ce-b0d8-7c8e1edea029	6	1.00	21.22	45.00	21.22	45.00	23.78	\N	2026-05-17 13:13:49.788418+00
140	a55382f4-8593-4d38-925c-b868fadc1edb	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-17 13:13:59.464209+00
141	a55382f4-8593-4d38-925c-b868fadc1edb	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	2.00	25.02	49.00	50.04	98.00	47.96	\N	2026-05-17 13:14:11.180048+00
142	a55382f4-8593-4d38-925c-b868fadc1edb	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-17 13:14:21.793431+00
143	a55382f4-8593-4d38-925c-b868fadc1edb	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-17 13:14:34.121264+00
144	a55382f4-8593-4d38-925c-b868fadc1edb	f30b3e28-f290-4954-b818-0a608fa7c654	5	1.00	33.30	58.00	33.30	58.00	24.70	\N	2026-05-17 13:14:39.381337+00
145	5eb11394-53b5-4254-821d-45d92f8a0ce6	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	1.00	9.99	40.00	9.99	40.00	30.01	\N	2026-05-17 13:24:05.8383+00
146	5eb11394-53b5-4254-821d-45d92f8a0ce6	20afc8d4-63b6-4cfe-b9c8-4988eda32993	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-17 13:24:18.392803+00
147	5eb11394-53b5-4254-821d-45d92f8a0ce6	163eed67-dfa7-47cb-bb26-72f6633f59cf	5	1.00	18.15	45.00	18.15	45.00	26.85	\N	2026-05-17 13:24:24.441713+00
148	5eb11394-53b5-4254-821d-45d92f8a0ce6	6ef878fc-08ae-4848-bd69-d65692254dc8	5	1.00	15.50	35.00	15.50	35.00	19.50	\N	2026-05-17 13:24:32.909822+00
149	5eb11394-53b5-4254-821d-45d92f8a0ce6	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	11	1.00	30.00	49.00	30.00	49.00	19.00	\N	2026-05-17 13:24:44.229823+00
150	5eb11394-53b5-4254-821d-45d92f8a0ce6	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-05-17 13:24:52.580428+00
151	5eb11394-53b5-4254-821d-45d92f8a0ce6	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-17 13:25:05.303586+00
152	5eb11394-53b5-4254-821d-45d92f8a0ce6	150398ab-f4ab-4de2-91bc-6d51d13c8048	6	1.00	21.00	49.00	21.00	49.00	28.00	\N	2026-05-17 13:25:24.160539+00
153	5eb11394-53b5-4254-821d-45d92f8a0ce6	c9bd1e8e-7666-4002-ac41-16b2a1103d6a	8	1.00	40.00	75.00	40.00	75.00	35.00	\N	2026-05-17 13:25:51.324938+00
154	5eb11394-53b5-4254-821d-45d92f8a0ce6	b2b3aedd-b78c-4e74-bea2-a76c94462fb0	6	1.00	28.86	55.00	28.86	55.00	26.14	\N	2026-05-17 13:26:08.647271+00
155	5eb11394-53b5-4254-821d-45d92f8a0ce6	ce5eb1c3-05b4-446c-bd6d-2ecfee916391	7	1.00	19.40	45.00	19.40	45.00	25.60	\N	2026-05-17 13:26:22.460826+00
156	5eb11394-53b5-4254-821d-45d92f8a0ce6	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-05-17 13:26:36.432417+00
157	5eb11394-53b5-4254-821d-45d92f8a0ce6	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	2.00	24.05	49.00	48.10	98.00	49.90	\N	2026-05-17 13:27:00.176214+00
120	e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	11a35476-3eba-411a-8b8f-3ccfd86bbe70	6	2.00	27.00	65.00	54.00	130.00	76.00	\N	2026-05-17 11:25:32.76353+00
158	5eb11394-53b5-4254-821d-45d92f8a0ce6	4338276c-f346-4802-8341-51112846bce7	8	1.00	41.23	75.00	41.23	75.00	33.77	\N	2026-05-17 13:27:12.918424+00
159	5eb11394-53b5-4254-821d-45d92f8a0ce6	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-17 13:27:22.77088+00
160	5eb11394-53b5-4254-821d-45d92f8a0ce6	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	1.00	25.02	49.00	25.02	49.00	23.98	\N	2026-05-17 13:27:31.527654+00
161	5eb11394-53b5-4254-821d-45d92f8a0ce6	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	1.00	37.77	75.00	37.77	75.00	37.23	\N	2026-05-17 13:27:41.082145+00
162	5eb11394-53b5-4254-821d-45d92f8a0ce6	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-05-17 13:27:54.019173+00
163	5eb11394-53b5-4254-821d-45d92f8a0ce6	f30b3e28-f290-4954-b818-0a608fa7c654	5	3.00	33.30	58.00	99.90	174.00	74.10	\N	2026-05-17 13:28:04.942331+00
164	5eb11394-53b5-4254-821d-45d92f8a0ce6	6ef878fc-08ae-4848-bd69-d65692254dc8	5	2.00	15.50	35.00	31.00	70.00	39.00	\N	2026-05-17 13:28:28.932042+00
97	e586b75f-0f41-4998-a4b2-c2667765f1b5	3fb2bcc6-66a1-48f7-9f44-4303bcbd42c8	6	0.00	76.81	190.00	0.00	0.00	0.00	\N	2026-05-16 20:55:22.661252+00
165	489cec38-1522-4fe1-9655-3673a422ed6c	34d9c074-bebe-4b26-b684-1a621789839a	5	1.00	32.00	49.00	32.00	49.00	17.00	\N	2026-05-18 19:20:37.525676+00
166	489cec38-1522-4fe1-9655-3673a422ed6c	1f300abf-904d-4b4e-ad3e-b354d0e37310	6	1.00	17.65	40.00	17.65	40.00	22.35	\N	2026-05-18 19:20:46.712187+00
168	489cec38-1522-4fe1-9655-3673a422ed6c	163eed67-dfa7-47cb-bb26-72f6633f59cf	5	1.00	18.15	45.00	18.15	45.00	26.85	\N	2026-05-18 19:21:09.221662+00
169	489cec38-1522-4fe1-9655-3673a422ed6c	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	3.00	18.30	40.00	54.90	120.00	65.10	\N	2026-05-18 19:21:22.627747+00
170	489cec38-1522-4fe1-9655-3673a422ed6c	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	8	1.00	44.87	75.00	44.87	75.00	30.13	\N	2026-05-18 19:21:31.072346+00
172	489cec38-1522-4fe1-9655-3673a422ed6c	55828daa-7fd3-4c7a-b704-faa7259ea0ce	13	1.00	30.83	60.00	30.83	60.00	29.17	\N	2026-05-18 19:22:24.319779+00
173	489cec38-1522-4fe1-9655-3673a422ed6c	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	6	1.00	24.05	49.00	24.05	49.00	24.95	\N	2026-05-18 19:22:36.795326+00
174	489cec38-1522-4fe1-9655-3673a422ed6c	62517356-0463-402d-bc31-940f9a522238	6	1.00	31.10	59.00	31.10	59.00	27.90	\N	2026-05-18 19:22:44.020453+00
175	489cec38-1522-4fe1-9655-3673a422ed6c	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-18 19:22:56.712207+00
176	489cec38-1522-4fe1-9655-3673a422ed6c	8d04bbf2-bedd-471c-9fd4-7558e00dc514	5	1.00	22.35	49.00	22.35	49.00	26.65	\N	2026-05-18 19:23:01.62956+00
177	489cec38-1522-4fe1-9655-3673a422ed6c	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	2.00	25.02	49.00	50.04	98.00	47.96	\N	2026-05-18 19:23:19.465577+00
178	489cec38-1522-4fe1-9655-3673a422ed6c	c14aabde-93dc-44a2-a114-dce69171b34a	5	1.00	9.00	29.00	9.00	29.00	20.00	\N	2026-05-18 19:23:28.823065+00
179	489cec38-1522-4fe1-9655-3673a422ed6c	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	1.00	37.77	75.00	37.77	75.00	37.23	\N	2026-05-18 19:23:37.039743+00
180	489cec38-1522-4fe1-9655-3673a422ed6c	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	1.00	45.17	79.00	45.17	79.00	33.83	\N	2026-05-18 19:23:46.231189+00
181	489cec38-1522-4fe1-9655-3673a422ed6c	d9168dbf-8847-42aa-8339-3fb00d6d1708	5	1.00	36.80	58.00	36.80	58.00	21.20	\N	2026-05-18 19:24:02.984855+00
171	489cec38-1522-4fe1-9655-3673a422ed6c	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	3.00	12.00	35.00	36.00	105.00	69.00	\N	2026-05-18 19:21:39.051789+00
167	489cec38-1522-4fe1-9655-3673a422ed6c	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	2.00	9.99	40.00	19.98	80.00	60.02	\N	2026-05-18 19:20:54.830456+00
182	489cec38-1522-4fe1-9655-3673a422ed6c	4ea61f2a-96e4-417a-a994-3ca4aca6863a	7	1.00	27.50	59.00	27.50	59.00	31.50	\N	2026-05-18 19:28:11.987272+00
183	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-19 20:23:39.983886+00
184	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	4.00	18.30	40.00	73.20	160.00	86.80	\N	2026-05-19 20:23:47.512166+00
185	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	1.00	18.30	40.00	18.30	40.00	21.70	\N	2026-05-19 20:24:52.856972+00
186	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	10	1.00	22.00	45.00	22.00	45.00	23.00	\N	2026-05-19 20:25:17.157878+00
187	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	63b031d6-c373-423c-9f26-35422f608369	7	1.00	24.05	50.00	24.05	50.00	25.95	\N	2026-05-19 20:25:30.63503+00
188	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	8	2.00	44.87	75.00	89.74	150.00	60.26	\N	2026-05-19 20:25:50.658808+00
189	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-19 20:25:59.890197+00
190	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	06137af0-4bd9-4eac-93da-7ccfd6195fdf	5	1.00	17.50	40.00	17.50	40.00	22.50	\N	2026-05-19 20:26:12.614842+00
191	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	55.00	26.55	55.00	28.45	\N	2026-05-19 20:26:17.045904+00
192	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	0487055c-6183-45da-a5ff-9c46c8ede331	6	1.00	27.05	55.00	27.05	55.00	27.95	\N	2026-05-19 20:26:30.736056+00
193	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	13194c47-554b-47d8-9364-1a4e5eacf24b	\N	1.00	20.70	45.00	20.70	45.00	24.30	\N	2026-05-19 20:26:40.137183+00
194	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	ce5eb1c3-05b4-446c-bd6d-2ecfee916391	7	1.00	19.40	45.00	19.40	45.00	25.60	\N	2026-05-19 20:26:44.624609+00
195	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	10ea1108-3a24-4991-a32b-c5523ead4e83	6	1.00	23.90	49.00	23.90	49.00	25.10	\N	2026-05-19 20:26:59.717451+00
196	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	d6abbcc3-1287-42b8-9410-b0c303c7bb12	5	3.00	12.00	35.00	36.00	105.00	69.00	\N	2026-05-19 20:27:05.091741+00
197	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	62517356-0463-402d-bc31-940f9a522238	6	1.00	31.10	59.00	31.10	59.00	27.90	\N	2026-05-19 20:27:19.420695+00
198	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	4338276c-f346-4802-8341-51112846bce7	8	1.00	41.23	75.00	41.23	75.00	33.77	\N	2026-05-19 20:27:26.863176+00
199	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	e5d51236-1d54-4aab-a945-67574c9eaadc	6	1.00	15.75	45.00	15.75	45.00	29.25	\N	2026-05-19 20:27:44.883284+00
200	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	9	3.00	18.00	40.00	54.00	120.00	66.00	\N	2026-05-19 20:27:53.820216+00
201	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	127b5028-a4af-4315-b2c3-d3602918a0ba	5	1.00	18.50	45.00	18.50	45.00	26.50	\N	2026-05-19 20:28:09.206899+00
202	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	2.00	37.77	75.00	75.54	150.00	74.46	\N	2026-05-19 20:28:24.561038+00
203	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	5	2.00	45.17	79.00	90.34	158.00	67.66	\N	2026-05-19 20:28:35.114867+00
204	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	33e15f0e-3fba-49a0-8510-a3a51ce09330	5	2.00	18.30	40.00	36.60	80.00	43.40	\N	2026-05-20 20:05:02.601641+00
205	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	6ef878fc-08ae-4848-bd69-d65692254dc8	5	2.00	15.50	35.00	31.00	70.00	39.00	\N	2026-05-20 20:05:06.729213+00
206	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	8d04bbf2-bedd-471c-9fd4-7558e00dc514	5	2.00	22.35	49.00	44.70	98.00	53.30	\N	2026-05-20 20:05:31.115777+00
207	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	127b5028-a4af-4315-b2c3-d3602918a0ba	5	2.00	18.50	45.00	37.00	90.00	53.00	\N	2026-05-20 20:05:41.413195+00
208	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	5	1.00	26.55	55.00	26.55	55.00	28.45	\N	2026-05-20 20:05:55.900649+00
209	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	736cd6eb-e985-4f43-8c1d-efd17fde7d78	5	1.00	24.00	49.00	24.00	49.00	25.00	\N	2026-05-20 20:06:07.05363+00
210	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	07beeda9-9a02-4aea-bb58-703cbc0bfc2e	5	1.00	9.99	40.00	9.99	40.00	30.01	\N	2026-05-20 20:06:16.340095+00
211	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	65c8da1f-3970-46b3-887b-cf6308c80ea6	8	1.00	24.67	49.00	24.67	49.00	24.33	\N	2026-05-20 20:06:28.218385+00
212	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	8	1.00	44.87	75.00	44.87	75.00	30.13	\N	2026-05-20 20:06:39.585244+00
213	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	81652f9c-8e38-451c-8ac3-c2e490c1f24c	6	1.00	25.02	49.00	25.02	49.00	23.98	\N	2026-05-20 20:06:43.19713+00
214	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	5	1.00	37.77	75.00	37.77	75.00	37.23	\N	2026-05-20 20:06:57.223355+00
215	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	661923c8-ea64-4fd8-9d57-65cb523dd4c4	6	1.00	28.30	90.00	28.30	90.00	61.70	\N	2026-05-20 20:09:51.178661+00
\.


--
-- Data for Name: movimentacoes_produtos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.movimentacoes_produtos (id, venda_id, produto_id, fornecedor_id, data_movimentacao, numero_venda, quantidade, preco_custo, preco_venda, valor_total, custo_total, lucro_total, observacao, created_at) FROM stdin;
\.


--
-- Data for Name: pagamentos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pagamentos (id, venda_id, data_pagamento, valor_pago, forma_pagamento, observacao, created_at, status, estornado_em, observacao_estorno) FROM stdin;
ddc6b63e-c633-4d65-8139-89359e1c97bc	0a650d3a-8954-49e9-a234-2f5c03b2f2e9	2026-05-05	98.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:28:39.133464	CONFIRMADO	\N	\N
76c37b78-b3f9-490b-bf45-5fdfc7f36f9b	4ce062e3-07d5-4a1e-9111-b83ce8b602c9	2026-05-05	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:28:54.769031	CONFIRMADO	\N	\N
6c95624e-b9ee-4b66-b64b-36d70d89cdfe	208532fe-ec39-40e8-93ab-3ccede046656	2026-05-05	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:29:10.540625	CONFIRMADO	\N	\N
3bdd0053-4939-48c9-bf7c-20cd253d8bdb	357cb992-7173-4a66-847b-3259299993b0	2026-05-05	84.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:29:29.982601	CONFIRMADO	\N	\N
73e9c62f-39bb-42f0-b64d-737350f69a8d	243fecf8-bc09-4d83-9d7e-92bacfc85d40	2026-05-05	147.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:30:04.792766	CONFIRMADO	\N	\N
f58c4f84-090c-4e79-94f8-9eade143095d	62dd5c44-d634-4e70-bcb8-3a3456754f88	2026-05-05	47.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:30:22.426705	CONFIRMADO	\N	\N
a08f421e-80e1-4975-90d8-0859e06123dc	ce44e86a-d370-49dd-aa3f-b3592ec26e7e	2026-05-05	110.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:30:43.017654	CONFIRMADO	\N	\N
ef0a79e3-f397-49a9-b796-a86b7a81f9db	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	2026-05-05	99.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:31:01.945421	CONFIRMADO	\N	\N
87509fc9-d7b4-418a-99d8-a5b30e0dccc1	00f90737-4a74-4eb1-93fe-d09eddf2b8ed	2026-05-11	196.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:47:38.001754	CONFIRMADO	\N	\N
e1a88726-431d-46dc-834b-d0c49c372b95	ea0e7ffb-b1d9-4224-819b-fd83aab3c4d5	2026-05-11	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:48:48.102912	CONFIRMADO	\N	\N
8150d13f-ba24-4440-be13-0e5992a8e600	81025592-2832-479e-8555-6a90e70d36d9	2026-05-11	90.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:49:07.217869	CONFIRMADO	\N	\N
5d3e2190-07b5-4f32-a8b6-6e91b674a895	1da34841-d09a-4255-a9bd-b2e43821ecb6	2026-05-11	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:49:26.457667	CONFIRMADO	\N	\N
a94d2c70-d1c7-4da1-a06f-5f25609b8b99	b6e2482c-651d-489d-928d-c604363d448b	2026-05-11	89.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:49:46.391915	CONFIRMADO	\N	\N
c8e96d0b-ad25-4c56-bc42-8b2bbb9494d1	5c13f4dc-84dd-4813-9464-790039edb9b4	2026-05-11	90.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:50:07.77019	CONFIRMADO	\N	\N
d32edf66-1088-4351-8025-4b03a8b444d3	1c1b3861-6e36-46b3-8beb-28554d4b4888	2026-05-11	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:50:38.56319	CONFIRMADO	\N	\N
684d5107-2c93-4db9-8600-a122bde426ec	5414f15c-64a6-4006-a786-ef41d4541123	2026-05-11	93.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:51:02.685384	CONFIRMADO	\N	\N
a4d60e2f-3ba4-4c23-8fd2-7f837ba32238	6633fe77-14f9-4bbb-9022-939ffa1e7bc4	2026-05-11	180.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:51:18.96339	CONFIRMADO	\N	\N
bac43642-d84f-4ce7-a45f-f1f89d15b89e	dd8291ac-de40-46a5-945d-f3ae47c5547c	2026-05-12	55.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 00:14:47.242538	CONFIRMADO	\N	\N
25858ff7-7fd6-40cd-b62f-05a72b156d8f	38fa63a9-c781-47f3-952f-78233032a6e8	2026-05-12	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:17:27.151264	CONFIRMADO	\N	\N
53f9a720-7313-40d3-babe-6ffc00802a11	36dbc8cf-2332-4035-8ed4-63ccbf2e6c76	2026-05-12	79.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:18:12.352105	CONFIRMADO	\N	\N
ec15eb6f-b956-401f-91dd-370fbce013a0	918d06f2-c720-4161-a90e-e06196841cdb	2026-05-12	149.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 00:18:37.582694	CONFIRMADO	\N	\N
f057db04-9e24-4276-9748-459bd21e0915	9f18e02d-37e3-429e-af23-c22c7fdb6278	2026-05-12	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:19:01.342379	CONFIRMADO	\N	\N
188be2c1-012c-44e9-9276-b56440794820	4549c2f2-ed62-457a-b494-a016634abe36	2026-05-12	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:19:20.663062	CONFIRMADO	\N	\N
058a3943-d7bc-4cbf-b2dc-32d30d20ddcb	c63805a8-d611-40c4-a060-47f0346b686d	2026-05-12	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:04:34.760543	CONFIRMADO	\N	\N
640d395a-605c-4a36-9a66-154df0ff68a3	d35d1e96-7190-4133-bcb1-b0ec18f8439b	2026-05-12	35.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 02:04:51.053879	CONFIRMADO	\N	\N
8cb24280-09a9-41a4-8a28-57cd4ae912a9	5de02b5b-6cd2-494e-b220-10c610b2d923	2026-05-12	99.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:05:08.347713	CONFIRMADO	\N	\N
798dde19-0709-48bb-b8e4-1b713f2eef70	29d0cd64-ce82-4b49-b6fb-f5493f8443e9	2026-05-12	120.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:05:31.466436	CONFIRMADO	\N	\N
0275f6f5-1b27-453d-b56c-fea604a3b556	f1bb341c-87b0-45cd-b798-94ed71434040	2026-05-12	90.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 02:05:45.838384	CONFIRMADO	\N	\N
73fedb87-e1fa-49d0-bd21-92b5b61e092c	3a078226-8547-4318-b36c-397e06d52499	2026-05-12	58.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:06:14.355693	CONFIRMADO	\N	\N
2e843ad5-819c-4d5e-8282-821821e1f378	e885145f-9610-4b8a-bb6b-8d1b7bbeab63	2026-05-12	100.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 02:06:39.898726	CONFIRMADO	\N	\N
48f9cba2-a102-461b-a4a2-4db422605f94	e3491a28-2022-4d31-b5ef-06c22dbcfc4e	2026-05-12	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:07:03.062415	CONFIRMADO	\N	\N
45bb40ed-e553-46f8-b199-a8e12a17cf35	b81f4153-6d87-4cec-990d-1640330ad6e3	2026-05-12	144.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:07:19.421115	CONFIRMADO	\N	\N
a22b72e5-95b7-401c-bd9b-0d03b7c153f0	5a99cdfb-ac92-447c-adcf-59fc33120e07	2026-05-13	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:44:43.659332	CONFIRMADO	\N	\N
94dcf051-916d-478d-b522-ff4c2ad6c1f0	11fbbfc7-a58e-4efb-8904-c046ecf46791	2026-05-13	216.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:45:16.74621	CONFIRMADO	\N	\N
cdd9191d-0562-4326-89ab-a76487d48b55	d76369c8-7911-4394-adf0-b0b75845ff6d	2026-05-13	124.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:45:46.492676	CONFIRMADO	\N	\N
5311a0f4-274b-4a70-8566-217ea5e733c6	48a6fb1e-4bbe-47a7-9903-2e773b8e2fd5	2026-05-13	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:46:09.873716	CONFIRMADO	\N	\N
4ff20bc6-4ecf-4ae2-93e1-8f737ef2662c	1ba96e44-a35d-4c07-8c75-9f2b89570634	2026-05-13	114.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:46:34.745755	CONFIRMADO	\N	\N
10c4a22c-e48b-4c8d-b09e-f65ef533ad65	ab5f6f14-f0da-4a5b-a06c-03c6bcf65b69	2026-05-13	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:46:55.492703	CONFIRMADO	\N	\N
9f577aa0-5b7e-4141-8d3b-ce52b60b345f	35657dea-72b8-44c5-8e5e-1df3bdf45a1d	2026-05-13	99.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:47:13.942434	CONFIRMADO	\N	\N
a104d025-fe79-4529-be4c-f484eb673429	bbf25b89-d830-4c8f-9bcb-0ab555737d92	2026-05-13	78.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:47:33.006366	CONFIRMADO	\N	\N
7e7fffbf-4153-47ac-93e2-a52d2e2f663d	a80fd83f-cc74-4a28-8ce2-bb721f3dea65	2026-05-14	126.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:47:50.687774	CONFIRMADO	\N	\N
9452a55f-aa78-44ee-b74a-c458af944822	4785e3d7-da1e-40b4-9eb9-d3e7a39723b7	2026-05-14	80.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:48:17.863473	CONFIRMADO	\N	\N
4220cf7a-7192-4eb0-a049-467f7a93d703	f446866d-12e6-414e-9f97-8189ed63c91c	2026-05-14	108.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:48:41.969554	CONFIRMADO	\N	\N
c7cb6b54-b35e-4687-a6e2-b16cad31e470	2b63a779-9e1e-4ba9-a1fa-cb03f5d2346d	2026-05-14	114.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:49:00.510325	CONFIRMADO	\N	\N
8fb4fc46-a031-4f15-94f5-7ea2a109b196	a4bec326-d26b-422a-8792-6f970307f905	2026-05-14	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:49:29.173615	CONFIRMADO	\N	\N
50c94e18-7b89-4aee-bd11-c97eb6026567	4887379e-587d-4bd2-922b-7abd94298aa0	2026-05-14	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:49:53.79991	CONFIRMADO	\N	\N
53a930e8-b1c4-4ca7-9ec5-b62ee4d6d356	b3e653d6-6c94-457e-9898-4f04114849a0	2026-05-14	49.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:50:14.073104	CONFIRMADO	\N	\N
dbc619f1-d732-4821-b350-e07c2980a67f	94f6f425-f794-4600-85ef-d67ef18ce494	2026-05-14	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:50:44.044805	CONFIRMADO	\N	\N
1179a3f6-4fd9-447f-9bd2-e01058d7a33a	e60cc389-50ce-4bee-9706-4fc51250eb33	2026-05-14	49.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:50:59.542482	CONFIRMADO	\N	\N
bbd6210a-8d40-469f-830e-3b767c693081	73f1af8c-b77d-4b2d-8012-7ce6d208f9a5	2026-05-14	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:51:23.012263	CONFIRMADO	\N	\N
d7d503c2-ba8d-43fc-88c8-30c831aabc22	4e10c86d-6028-478f-9706-96005d49ed5c	2026-05-14	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:51:46.439819	CONFIRMADO	\N	\N
bdece8be-de72-4cef-a93d-931b1f81fd28	1555efa1-b985-403a-a09c-131f59b298a1	2026-05-14	65.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:52:04.914882	CONFIRMADO	\N	\N
7a3d15c1-e58a-4547-a1ca-8dc208666326	f15e19b0-01fb-4dc5-88c0-489a0752ddd1	2026-05-14	128.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:52:29.457553	CONFIRMADO	\N	\N
d0443869-5a95-4bbf-8477-be4a6cb80123	82e19cf0-aec6-4120-8b12-e35bbd443c49	2026-05-14	110.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:52:49.402831	CONFIRMADO	\N	\N
ff5f725b-fb96-4630-9ee3-5000da6be701	da99fd7a-5807-4f7f-9188-9a1e72b820f9	2026-05-15	47.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 13:17:09.130339	CONFIRMADO	\N	\N
f0db4c3a-a194-4ff6-b3da-36389ac1bd49	ebce7525-c8a5-428d-84e7-63d899489252	2026-05-15	125.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 13:17:34.30836	CONFIRMADO	\N	\N
58a77b09-4a1b-461d-9bad-2a1e7ab7e6cd	071b922e-f96b-4469-97ec-48ec687fc8e1	2026-05-15	127.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 13:17:55.736273	CONFIRMADO	\N	\N
667d14e6-1a34-4243-9db0-8c826c49a8db	91cc80ea-081e-404c-aa14-50d19c97e79b	2026-05-15	274.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 13:18:14.863038	CONFIRMADO	\N	\N
2032b323-cceb-4e75-b144-cb660ed7d97e	1e8a9988-a7ef-45c5-b883-4f74430c7ebb	2026-05-15	100.00	Fiado / Em aberto	Pagamento parcial registrado no lançamento da venda	2026-05-17 13:20:01.037851	CONFIRMADO	\N	\N
6d51d1c3-982d-462e-9b49-9cad3ea68e79	5eb11394-53b5-4254-821d-45d92f8a0ce6	2026-05-15	78.00	Fiado / Em aberto	Pagamento parcial registrado no lançamento da venda	2026-05-17 13:23:17.813191	CONFIRMADO	\N	\N
1dfb5998-3f5e-4a50-a774-ae708dfe7588	a9afa99a-2862-425c-a640-f673ba14af08	2026-05-18	139.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:11:23.386857	CONFIRMADO	\N	\N
e394a729-4ffb-4c61-82dd-62e766061dca	3dbd3d38-cc5e-47ca-9854-d63183dc861f	2026-05-18	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:11:37.307058	CONFIRMADO	\N	\N
604ec6d4-ca19-47ef-860f-c63bf16d7465	ad2b6ba6-ed56-4942-acb6-c58685c6a825	2026-05-18	89.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-18 19:12:40.948293	CONFIRMADO	\N	\N
0f4e3a57-4402-4d9d-80b6-c6d733176b67	74c5ba81-f6bb-4de3-8ee6-06e53b39b513	2026-05-18	95.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:13:01.413192	CONFIRMADO	\N	\N
3c939598-458a-4076-9a24-9cc95370c23c	53cd6762-d038-4eea-90d5-e352d751e4a5	2026-05-18	213.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:13:20.254158	CONFIRMADO	\N	\N
64061bb6-1f1c-46e3-aba5-7938bd71416d	bab9868f-d987-4ec8-b4e6-6a470e7a241a	2026-05-18	119.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-18 19:15:32.442333	CONFIRMADO	\N	\N
354984e7-202b-4a18-bb7b-5504de74fa03	205b506d-d213-448c-b550-ad847dffb620	2026-05-18	263.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:15:46.584888	CONFIRMADO	\N	\N
0c4145d1-88da-440e-9815-e3eca5caaffd	c1e3a89f-fe3a-4dc1-9a8e-92c2681be6c0	2026-05-19	124.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-19 20:11:18.393274	CONFIRMADO	\N	\N
aa5ee14c-9763-4369-b051-cb97f49eb2b2	3a1a6dec-bcdc-4d27-ae58-dc471ab029d5	2026-05-19	198.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-19 20:11:43.168479	CONFIRMADO	\N	\N
e3cd87f9-360c-4033-a31a-fb41870937cc	c615a94f-bf77-4281-b003-6112ccfe980a	2026-05-19	70.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-19 20:12:04.884992	CONFIRMADO	\N	\N
88b1d235-2c01-4daa-be33-ecaf066bafce	abcebc08-0baa-4aba-bed2-6a857ee7a025	2026-05-19	120.00	Débito American | Cielo	Pagamento integral registrado no lançamento da venda	2026-05-19 20:12:24.306861	CONFIRMADO	\N	\N
8394b5e4-7f29-4968-8e21-c1fc4dff96bd	dbd228e1-f8f6-4df4-960c-d309640d3087	2026-05-19	300.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-19 20:12:45.925622	CONFIRMADO	\N	\N
d21f59a2-cc14-48f8-bc9f-8908bcb53d9f	9abc0afd-0084-45a7-b2bf-bed3bd3e8ae3	2026-05-19	40.00	Débito American | Cielo	Pagamento integral registrado no lançamento da venda	2026-05-19 20:13:01.395229	CONFIRMADO	\N	\N
6dbeff9d-0ff7-4f3b-9d0b-4977ca77e0ea	c0727a2a-a99e-4015-9498-8f42f3689398	2026-05-20	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-20 19:58:34.281188	CONFIRMADO	\N	\N
55696b81-b83f-4609-b26a-74806fdab8ef	b1af8bb9-8e02-4611-a857-7a5f263a8a1c	2026-05-20	80.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:00:19.232263	CONFIRMADO	\N	\N
c8168f6f-9f4c-4aa0-a21b-8350472a8270	8b38c0c2-5904-4309-b725-269c3abc73ca	2026-05-20	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:00:40.91367	CONFIRMADO	\N	\N
5007ae6a-c1ec-4c22-873d-3fb77991b2ed	99fd941f-0ae1-490b-8233-1cadd313612f	2026-05-20	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:01:25.108323	CONFIRMADO	\N	\N
56068833-11db-424b-853c-d8e287d57112	80e50d36-8fe7-4921-9b0d-bf8f3e586548	2026-05-20	35.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-20 20:01:41.867984	CONFIRMADO	\N	\N
8b472879-c39d-44e5-b967-bd4a326751b0	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	2026-05-20	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:02:07.230978	CONFIRMADO	\N	\N
f954b267-b686-4a74-b537-acdcaf30d821	80e50d36-8fe7-4921-9b0d-bf8f3e586548	2026-05-20	35.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-20 21:32:47.413131	CONFIRMADO	\N	\N
2aa13638-9473-4fe8-9a6c-30405a5557d5	489cec38-1522-4fe1-9655-3673a422ed6c	2026-05-22	60.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-22 13:23:18.782241	CONFIRMADO	\N	\N
0d0aae96-890d-4043-9b12-44bf318a4571	900d6999-d493-4c2b-9b8c-e5b9361c2530	2026-05-22	1.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-22 14:09:35.793278	CONFIRMADO	\N	\N
7b558a22-1350-4eaf-9cb1-c1576f72903b	2519490f-2d5e-4421-9283-8400d41e9e67	2026-05-26	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-27 20:33:17.605172	CONFIRMADO	\N	\N
b2506f54-6e9e-4efd-8b32-87799c3169af	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-22	0.50	Pix	Pagamento registrado pelo Mini ERP	2026-05-22 14:30:18.738772	ESTORNADO	2026-05-22 21:31:01.371+00	Pagamento lançado no cliente errado
86e10dc1-79c3-4d71-aec8-e20d51122efe	7e880a15-fe45-4d0d-82ea-9848e93a8e9e	2026-05-26	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-27 20:58:10.893686	CONFIRMADO	\N	\N
a391bdc0-f699-4cfe-a01a-7ae41fd17883	82eb42fd-798e-4b33-8eb8-35a7e80ff92f	2026-05-26	49.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-27 20:58:32.771755	CONFIRMADO	\N	\N
2644dcb0-7dac-44d0-889a-f3c8d51fb63d	d14ba9a1-0c8c-4881-baf9-78443925a92a	2026-05-26	40.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-27 20:59:04.696053	CONFIRMADO	\N	\N
03d134d5-5cf2-4774-a77c-f47032fdce41	101c13b0-e9cb-4d4d-918d-4059f0122920	2026-05-26	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-27 20:59:33.936133	CONFIRMADO	\N	\N
2358e813-b65e-4065-95fc-42ab61745544	eea41fd2-933b-4e75-ae00-9d7c5373a133	2026-05-26	198.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-27 20:59:54.53735	CONFIRMADO	\N	\N
7745e830-6ec9-49ce-ade7-70b3dee5f143	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-25	0.10	Pix	Pagamento registrado pelo Mini ERP	2026-05-25 00:35:20.529673	ESTORNADO	2026-05-25 01:05:16.517+00	Pagamento lançado no cliente errado
9840a252-5221-4611-ac4f-235db0b46380	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-25	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-05-25 01:13:10.430146	ESTORNADO	2026-05-25 01:14:12.416+00	Pagamento lançado no cliente errado
100bc210-a6fb-4a6f-8b84-da9398b0770a	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-25	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-05-25 01:20:57.85946	ESTORNADO	2026-05-25 01:21:13.767+00	Pagamento lançado no cliente errado
5f45d0f5-d7bd-45d3-a938-7cebfae9b5d5	44eee381-2015-46b6-9ad5-9df7e9cb620a	2026-05-18	49.00	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-05-26 23:12:23.872353	CONFIRMADO	\N	\N
231b0225-4a8f-402a-9afe-8aee3e7a1b65	8f072efe-806d-4bb0-9054-4927940bfc8b	2026-05-26	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-27 20:32:05.503097	CONFIRMADO	\N	\N
8483719c-478e-4f33-ba44-3254769a0769	e93592ed-ed06-4205-a6d9-3359209e1238	2026-05-26	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-27 20:32:31.992216	CONFIRMADO	\N	\N
19648458-d2fd-4b5c-9a14-c2a1124edfe3	d791b36e-9a99-478e-bc12-ecb2520e31b6	2026-05-26	49.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-27 20:32:54.080281	CONFIRMADO	\N	\N
940b89ec-f799-4efd-9558-73c63c5cdc53	1f4c1628-1250-48b0-b5de-383ccb197085	2026-05-26	49.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-27 21:00:16.553401	CONFIRMADO	\N	\N
7b311237-0ce2-4f81-9289-5e0f055adb4e	57e92350-ae2e-4f59-bfc9-24ca5a0adc54	2026-05-26	35.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-27 21:00:35.295905	CONFIRMADO	\N	\N
34077172-a06e-47c1-b183-ba48aa2a66b3	d2fcad60-1a74-46a2-a77a-ad0c3dc0135f	2026-05-26	40.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-27 21:00:57.978065	CONFIRMADO	\N	\N
8b861a37-5efc-48c3-ae01-c8697a3be529	371ff5b1-6cfc-400c-8568-a8a814922ca4	2026-05-26	40.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-27 21:01:19.527258	CONFIRMADO	\N	\N
1e5cf2ad-2983-4f52-bf38-a19ac2faec3c	bebf13ae-9874-42cb-8677-b723e8d5fb2d	2026-05-27	118.00	Link de pagamento	Pagamento integral registrado no lançamento da venda	2026-05-27 21:01:54.484989	CONFIRMADO	\N	\N
27114d8c-5b3f-4ce2-ac4a-1027fc19784e	0996977b-d01b-4989-ae17-f51073ac7b0f	2026-05-28	187.00	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-05-28 19:41:56.17441	CONFIRMADO	\N	\N
c598b29b-7154-4851-84c7-3a5457f1a19e	6e220be9-10ba-487c-8d2f-9c9ad63e3cac	2026-05-27	48.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-28 19:53:46.247731	CONFIRMADO	\N	\N
9c33ef3f-831a-4c00-ad06-b5df80ee52c0	261f87e7-32be-4c6f-bd89-c43e96c0f402	2026-05-27	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 19:54:13.56042	CONFIRMADO	\N	\N
f6816d6e-3d8c-4df2-878a-b1db4cb9851e	d079efe6-5c2d-4580-8502-b5ef96397c0c	2026-05-27	103.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 19:54:34.226341	CONFIRMADO	\N	\N
a0a1ff7f-490f-4f29-aa85-15f291e7be9e	258e634f-1890-4904-8fe1-d08f2406c611	2026-05-27	198.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-28 19:54:58.065812	CONFIRMADO	\N	\N
f9f6b84f-fad4-4c81-a1ce-8a0af226e654	6c011e66-0ee9-4903-91eb-ee0bb511c47e	2026-05-27	49.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 19:55:21.338415	CONFIRMADO	\N	\N
922b8b7b-ad97-46fa-8a66-ba0c1484b1f2	d28d2e82-ac0a-4aba-b729-91d2f4f4cf6f	2026-05-27	118.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 19:56:11.813398	CONFIRMADO	\N	\N
30c4e780-85b3-4108-be66-327649b4895f	df4b3e8a-9438-4996-8d9d-c898933dc392	2026-05-27	79.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 19:55:42.960732	CONFIRMADO	\N	\N
718ead56-e713-4edf-a569-c99554d9e842	8623da60-e52c-4922-8d3d-5f176b1bdcb6	2026-05-27	108.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 19:56:32.947287	CONFIRMADO	\N	\N
25cd2db0-1bb2-465c-b0ac-c3cbaffa4439	b5e5b9f1-199a-4528-b3a6-38802649dc73	2026-05-28	109.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 20:22:08.602594	CONFIRMADO	\N	\N
525a5ab7-f52e-4e01-b590-1d5f42c9ef11	b5e5b9f1-199a-4528-b3a6-38802649dc73	2026-05-28	90.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 20:23:35.154438	CONFIRMADO	\N	\N
68499edc-d291-44e2-b738-4246e17c0aca	ecf2166b-72ff-482a-af28-a993737d17e3	2026-05-28	85.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 20:24:29.80886	CONFIRMADO	\N	\N
99c73017-564e-4dab-9f70-bfcef8f9d40a	98368cfb-a396-49d0-b2d8-5e3f022433d5	2026-05-28	118.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 20:27:06.730728	CONFIRMADO	\N	\N
d0d044b2-4220-4772-8b32-d00d780faff4	027cb1a8-0034-4b82-a443-3a89e47fb9c4	2026-05-28	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 20:28:17.405357	CONFIRMADO	\N	\N
c637e1d0-43c2-405f-a0c1-c88f8b94750e	7436202a-beae-47f1-a64c-9cfb3f60bbc5	2026-05-28	128.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-28 20:28:58.006068	CONFIRMADO	\N	\N
3dfd3290-925f-4994-9784-08028a64be02	7d0fef16-b108-4131-8248-a489435ee3d9	2026-05-28	59.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 20:29:10.337119	CONFIRMADO	\N	\N
ded709ca-0e1a-433b-9bcd-119e4d583881	fab8e9ca-9ff9-4cab-8a42-564543599080	2026-05-28	65.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-28 20:48:10.853643	CONFIRMADO	\N	\N
8b6b7d3a-7327-4974-be8e-03ee1476545a	82a1f713-8e07-4123-8cfc-c35ffe0dc766	2026-05-28	144.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-28 20:55:48.216944	CONFIRMADO	\N	\N
5782a302-4bed-4f8d-867c-1f18d9a13d07	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 01:55:10.824235	CONFIRMADO	\N	\N
115241bd-bc47-4e0c-b49b-704d674e9f79	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 02:20:44.098887	CONFIRMADO	\N	\N
44d2037f-966b-47e1-bcd4-bd1eab217fdf	066110f9-f049-4e60-ad57-531fae9d020c	2026-05-28	0.01	Pix	Pagamento integral registrado no lançamento da venda	2026-05-29 02:21:46.357587	CONFIRMADO	\N	\N
b48ac8c5-4251-4c86-a152-32cf93d0796e	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 02:22:28.159399	CONFIRMADO	\N	\N
0aef04f4-3d19-4ccd-96b3-ef438e2a8928	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 02:29:01.419001	CONFIRMADO	\N	\N
27a4f8c8-6d2f-43fb-b6a4-a5f38386a5e6	40f2a259-978d-4689-abfd-9965d37a253d	2026-05-28	0.01	Pix	Pagamento integral registrado no lançamento da venda	2026-05-29 02:30:04.125568	CONFIRMADO	\N	\N
8c79a070-0ad1-4367-961f-04aa431d1d9d	f729efa3-4ad5-42a1-bf78-0e57d27ad706	2026-05-29	0.01	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-05-29 02:30:59.370686	CONFIRMADO	\N	\N
3846142c-d375-4452-b4a4-bad87f84bc12	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.01	Dinheiro	Pagamento registrado pelo Mini ERP	2026-05-29 02:31:33.365855	CONFIRMADO	\N	\N
b69b6ca1-1317-4798-ba8b-d3172f0f0df0	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.01	Crédito Master | Visa	Pagamento registrado pelo Mini ERP	2026-05-29 02:33:21.791218	CONFIRMADO	\N	\N
7ddbff16-a755-4ef6-8fa2-97d1e02955f3	93020737-b180-4727-8761-e999475bf13e	2026-05-29	0.01	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-05-29 02:38:49.037931	CONFIRMADO	\N	\N
bee5a154-206e-4b78-af13-b123a35db5d0	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.44	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 02:39:51.181947	ESTORNADO	2026-05-29 02:44:21.089+00	Pagamento lançado no cliente errado
d996febe-f082-4820-b2c2-c674b302dad8	b4023362-b74b-4d23-8a6d-c5c8ee026ab7	2026-05-28	0.01	Pix	Pagamento integral registrado no lançamento da venda	2026-05-29 02:52:47.339369	ESTORNADO	2026-05-29 02:55:53.305+00	Pagamento lançado no cliente errado
021931c3-d174-4b0f-bac4-78141f2ee200	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 02:59:41.951996	CONFIRMADO	\N	\N
605b5920-2fb4-4f69-b70c-6511a8c2a1da	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 09:25:28.134257	CONFIRMADO	\N	\N
6f3b72f9-edfa-4866-b705-8dd0534418d6	88186e76-0361-4f2f-b512-3f4807710514	2026-05-28	124.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-28 20:51:46.884006	ESTORNADO	2026-05-29 09:37:34.554+00	Pagamento lançado no cliente errado
b65dad56-bf92-437f-9448-c52911b32e4e	88186e76-0361-4f2f-b512-3f4807710514	2026-05-29	124.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 09:38:14.456806	CONFIRMADO	\N	\N
4831850a-7c28-49c0-aaea-91f9745499c1	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-29	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 09:39:22.326995	CONFIRMADO	\N	\N
d8a869e6-c54a-46d0-976e-c997d365b9b3	23800281-b69f-4b1d-b237-d5006e663d4e	2026-05-29	50.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-29 19:15:11.645352	CONFIRMADO	\N	\N
d21aa106-b689-479f-8963-9c9ca0a0a199	d99c001f-a8a9-458c-939a-5ae45c3b9f2f	2026-05-29	80.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-29 19:15:44.296591	CONFIRMADO	\N	\N
fda23386-ea30-43ce-8afc-3947feec3d10	2f2f5aba-6589-431b-8061-20c674541e5f	2026-05-29	180.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-29 19:15:57.668671	CONFIRMADO	\N	\N
c476d1ce-5435-49b8-ab5e-3c5a9335447e	e559e0d5-0f82-4a0a-8373-954e4574f48f	2026-05-29	60.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-29 19:16:16.67528	CONFIRMADO	\N	\N
0c65a511-375b-4493-bfcd-b8be811f6bcd	def98f39-19dc-4cde-b453-848fccaa5bba	2026-05-29	50.00	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-05-29 19:18:50.78262	CONFIRMADO	\N	\N
434a7c94-2cbc-4cfb-a6b1-21c4d64f30ba	0c51ed62-b867-47e8-af6b-81d2d654ebe4	2026-05-29	29.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-29 19:26:21.743026	CONFIRMADO	\N	\N
1005299c-5223-4a3f-b500-e3bec7f12fea	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-30	0.41	Pix	Pagamento registrado pelo Mini ERP	2026-05-30 23:31:37.829039	CONFIRMADO	\N	\N
286f4e97-c5eb-4656-8007-f8520511d4cf	2191ee18-3955-4ddb-b9dd-1f564bf4744e	2026-06-04	174.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-04 12:12:39.684202	CONFIRMADO	\N	\N
4239f972-8dac-4e00-9519-e18f4787a30a	d29e594c-bc57-4c5b-a022-b4ff19e00990	2026-05-29	0.01	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-05-29 19:40:00.178768	CONFIRMADO	\N	\N
3e886585-397c-4607-91eb-f60e00e4a515	8331ca3e-cfad-45cb-827f-37811276c1a5	2026-05-30	0.02	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-05-30 19:58:51.181782	CONFIRMADO	\N	\N
0832dfe4-77bc-47ad-98b2-ea12c175a268	cab44748-0f98-441b-80d2-090e84bc6bba	2026-05-30	0.07	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-05-30 20:05:12.208715	CONFIRMADO	\N	\N
b2871b9b-af1e-4c0d-a076-9e777961c854	946b4c0b-edda-4fbd-9537-a520c3159892	2026-06-04	149.00	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-06-04 18:13:51.76527	CONFIRMADO	\N	\N
1e889ff5-2510-4802-8362-9e76634a2480	208ec073-7f1a-4a25-bbb2-55143bd0a598	2026-06-04	49.00	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-06-04 18:14:09.843005	CONFIRMADO	\N	\N
b9993fb6-cb06-4894-a796-0f89984a949f	be7f7569-2d0e-44e6-b99b-70935285be12	2026-06-01	95.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 22:02:40.598879	CONFIRMADO	\N	\N
1285b562-bbf1-409a-8fbe-7722cbccc6dd	e932bee4-13a7-4906-8a07-afd765f3c717	2026-06-01	85.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 22:03:16.572728	CONFIRMADO	\N	\N
a2e39a84-4aea-46cd-ae9a-4a8c1cbbe29a	3ce85bb5-6815-4773-8e65-24823c57421e	2026-06-01	124.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-04 22:03:46.482302	CONFIRMADO	\N	\N
7dd31a33-88c8-433c-853c-8bdb4f898f0e	1ab9e510-5405-47cc-a589-70b4fbedc1b0	2026-06-01	161.95	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-04 22:12:06.972729	CONFIRMADO	\N	\N
a85c9c46-cfaf-4c90-91ac-f9d1b80e2cf2	1fcfcdf0-f4df-4a03-a3a4-1c7779690873	2026-06-01	70.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 22:13:05.086726	CONFIRMADO	\N	\N
44bdd5c3-e264-420b-a6d1-86a160ede06f	dcd56cf7-32f3-4430-8317-17df6521a9d7	2026-06-01	85.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-04 22:13:29.229339	CONFIRMADO	\N	\N
fb850c5b-e833-4324-add3-30fb8ca6b69c	6a40a38b-0a39-4d28-aa74-a9e73b494a8b	2026-06-01	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 22:13:47.11457	CONFIRMADO	\N	\N
c1dc21c9-e063-4c20-a6d9-6e0ff9e9ca83	05a39087-138c-4552-8e8c-35173fffefce	2026-06-01	149.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 22:14:22.623736	CONFIRMADO	\N	\N
4cb7e8be-9abd-4ce1-bdc4-20c1b2d42422	2e5d3eff-eeec-421d-9e93-af0a7d262106	2026-06-01	85.00	Link de pagamento	Pagamento integral registrado no lançamento da venda	2026-06-04 22:14:48.384638	CONFIRMADO	\N	\N
8ccceda3-e051-4f24-9e07-27d7e4eff12b	4ef44f90-6575-4ca6-b868-0dbdf79509b5	2026-06-02	49.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 22:45:45.552874	CONFIRMADO	\N	\N
639163ae-2dd7-40cd-9cd3-5e5a8a150587	15149621-f103-46d7-92c8-44914c9bab47	2026-06-02	135.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-04 22:46:14.297484	CONFIRMADO	\N	\N
3db6c162-1919-4615-b674-2ada35b09826	d2ecfc0f-1eea-44ea-a7e4-16ef273db757	2026-06-02	29.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 22:49:09.118832	CONFIRMADO	\N	\N
278a7469-a0ab-4136-954b-a9bb742a624b	4ad9bfdf-835e-4b3a-be27-ecd2b1ca3f8b	2026-06-02	222.25	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 22:52:09.246466	CONFIRMADO	\N	\N
6aa0ad60-5eef-458e-93c1-ad62ef31e36a	90d130e8-a835-4012-a8d9-9c8d0859e0df	2026-06-02	49.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-04 22:52:30.927395	CONFIRMADO	\N	\N
28d3ab78-c501-4861-8d11-8116647508f3	01779179-3412-4e8f-b7eb-8f2f2593e0fb	2026-06-02	98.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 22:52:58.059326	CONFIRMADO	\N	\N
f991dc32-9080-4758-83d3-93bac307eea9	f0f8aedf-dcee-441c-87c2-be5f94505ecf	2026-06-02	45.00	Débito American | Cielo	Pagamento integral registrado no lançamento da venda	2026-06-04 22:53:34.636657	CONFIRMADO	\N	\N
0fc6cecd-c504-4c64-a034-37abf87c7557	a9894630-fbdb-4d69-a1ed-0ffcbec6ad33	2026-06-02	197.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-04 22:55:05.087972	CONFIRMADO	\N	\N
0708a7d0-da81-4dfc-8a0e-bfed73a78247	596cd3b7-b86b-49a3-961a-e804767d0d26	2026-06-02	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 23:00:09.419374	CONFIRMADO	\N	\N
d33298f5-78a5-4924-9293-43f4899cb153	243d276d-2d2b-4e89-99b3-d9981cd87771	2026-06-02	79.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-04 23:00:58.581042	CONFIRMADO	\N	\N
da946cf8-2800-4de5-a0e8-c71091fdf1be	2885ff44-8402-4b7f-879b-415207bd5b46	2026-06-03	100.00	Pix	Pagamento parcial registrado no lançamento da venda	2026-06-04 23:28:31.831249	CONFIRMADO	\N	\N
1ad96c36-5343-4efd-ae52-0db01aa4a8ce	610e29a3-b220-470a-8d64-d4a9c9c5a29f	2026-06-03	89.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 23:31:20.838905	CONFIRMADO	\N	\N
379f8a58-8dca-4c6f-9ae4-12196d9c595c	1f323e6a-3df8-46cc-bbc9-dab9f2d38b49	2026-06-03	35.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 23:32:22.194755	CONFIRMADO	\N	\N
d588c108-da93-4e1d-812f-eb2d89d91eee	cc0d01d8-4211-4f50-9d01-05c9c29e485f	2026-06-03	94.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-04 23:33:13.132287	CONFIRMADO	\N	\N
07df3949-6b18-4dc3-a32c-a99dbc2bcd7c	19951426-4292-458a-bc6c-b5b2fd05c180	2026-06-04	555.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 00:20:08.164708	CONFIRMADO	\N	\N
acc276a8-a513-4df3-aa94-236fa387f36a	85ddf75b-c09a-4ed4-9ebb-b93e2fde87fa	2026-06-04	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 01:41:25.747126	CONFIRMADO	\N	\N
2d96f649-7f3a-40e2-9fe7-5479c170fe3f	67029f1b-4a74-45b4-a605-efd0a611f3b0	2026-06-04	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 01:50:18.38931	CONFIRMADO	\N	\N
cea2f965-3acf-4f59-a89b-cec6d7711a5a	b4023362-b74b-4d23-8a6d-c5c8ee026ab7	2026-06-04	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 01:49:17.658178	ESTORNADO	2026-06-05 02:28:30.7+00	Pagamento lançado no cliente errado
6dfaf252-9fcf-432e-9586-754d5c418036	b4023362-b74b-4d23-8a6d-c5c8ee026ab7	2026-06-04	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 02:28:52.285372	CONFIRMADO	\N	\N
eb9ee755-14d0-4ab8-9bd3-bfcb9a28cc6e	b1025bbd-811a-439f-883a-5b2ea46b5665	2026-06-04	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 02:29:27.765525	CONFIRMADO	\N	\N
fdc07af9-b21c-481d-8e3d-9bc959680f6f	a8f8dab0-7e43-42aa-9c87-91fba9e9dd4c	2026-06-04	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 02:42:53.723687	CONFIRMADO	\N	\N
5e95ec80-e9ec-489a-8cd3-71e6e981de45	a8f03b27-b9f6-46ef-a603-5db891ff0d5b	2026-06-05	179.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 10:53:09.846592	CONFIRMADO	\N	\N
4c299d03-d304-418e-bcf7-9f40a335d6b4	dc0490a5-ab35-40d0-8c1e-5ca428165783	2026-06-05	125.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 16:59:19.667657	CONFIRMADO	\N	\N
89d9f664-c34b-4e8c-881a-131cd3fa3cdf	55a61344-4e59-4aa0-b60d-64cfa135bf57	2026-06-05	84.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:07:57.482928	CONFIRMADO	\N	\N
d53518b5-e4c1-4461-9c60-4def306962ed	1db901a8-a06d-47c7-9c39-91f8a6963eea	2026-06-05	79.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:08:30.613946	CONFIRMADO	\N	\N
7da934d3-cd23-41ce-b96c-774b2ce4f87f	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	2026-06-05	119.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:09:18.336358	CONFIRMADO	\N	\N
f1448ed3-840d-4592-a3a7-525c499c323e	e97b26e2-a5f2-4c1e-a63b-5971c081f20c	2026-06-05	80.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:09:45.470253	CONFIRMADO	\N	\N
1d5fd56f-5cf7-4013-8b0a-e54477803d02	8264b44e-42e8-4379-b4df-34e0d2b2f19c	2026-06-05	237.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:10:53.483616	CONFIRMADO	\N	\N
acba5e77-a237-4df6-8e6a-8a86d041fc70	8b078770-99de-4d77-bcc3-2e2f1e803e57	2026-06-05	65.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:14:22.463223	CONFIRMADO	\N	\N
359ea3e5-6cce-4001-848f-2efb988366a7	06dbafbe-dbe6-4615-a0e9-6a5c3506297c	2026-06-05	60.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:14:45.115652	CONFIRMADO	\N	\N
59b8ee68-fedb-433b-a3af-18a6f19e2ee0	f65bfdca-b278-4161-a97f-d0513f837923	2026-06-05	59.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:16:59.318624	CONFIRMADO	\N	\N
c10c433b-c46b-49ac-8ee9-12459bfe9bc2	5eb11394-53b5-4254-821d-45d92f8a0ce6	2026-06-05	78.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:19:43.8792	CONFIRMADO	\N	\N
01e9dfe1-af2c-46fe-abe6-32f024a83c33	1e8a9988-a7ef-45c5-b883-4f74430c7ebb	2026-06-05	99.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:23:12.47703	CONFIRMADO	\N	\N
cd30465a-98a5-4b5f-b33f-fae7dc1d12b8	b3707044-3c12-49bd-acaa-153231bc8280	2026-06-05	129.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:24:39.668995	CONFIRMADO	\N	\N
f707a243-3fc6-4a0e-bfd6-3195c1dcd391	6fd890b0-a3d2-4c7f-b123-cb1de4da9cb8	2026-06-05	45.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:25:09.243192	CONFIRMADO	\N	\N
e47ecb17-6a23-4d5c-911c-612cf6a4c5da	d72b87b9-a0a8-4ab4-8bbf-ddcf5c0e1204	2026-06-05	80.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:25:17.99123	CONFIRMADO	\N	\N
28560423-75db-4ed7-8a04-9c7edd6ffa7a	0eabb817-452a-4008-9d6e-9704c614ecbe	2026-06-05	35.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:29:00.835077	CONFIRMADO	\N	\N
7891aae8-0afa-4140-bfca-60a754470e49	3d91a855-7ac7-4320-ba75-d4452eb4d6b9	2026-06-05	75.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:37:52.723101	CONFIRMADO	\N	\N
e185cedd-dceb-417d-affb-93ca83d2c1dc	8855e32b-2b45-4daa-84f6-5ca9fee4c003	2026-06-05	49.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:49:22.122981	CONFIRMADO	\N	\N
63df475e-8a71-4b2f-8a5d-852c1aca2736	7785fd56-6559-4658-8c4d-48e6c463d173	2026-06-05	50.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:52:10.314527	CONFIRMADO	\N	\N
c6e9f987-a122-4279-9ee1-98210bcbe8b2	db9e7e21-0a83-47e0-b66d-54c54dec7c8f	2026-06-05	85.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:53:09.279853	CONFIRMADO	\N	\N
e2b17939-721a-4ca0-b2f8-1f9ff73cc691	92831dfc-add8-4aef-9d8e-d1f065586610	2026-06-05	89.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 17:58:17.40341	CONFIRMADO	\N	\N
72b3355e-b054-4651-9e21-480d8d2aa359	c5f8d8b9-a19a-476c-8e7b-2cf2a9c077ab	2026-06-05	84.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 18:44:00.3158	CONFIRMADO	\N	\N
d1d05f77-068e-4efa-8fca-66648ac64126	daa1b85e-5bb0-4be0-a67c-83bf41fe1e80	2026-06-05	147.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 18:48:59.82761	CONFIRMADO	\N	\N
819ff3ed-0ba0-42dd-bcff-a4114da1518a	5a68ddad-3c4c-4e4b-ac38-092350b323f7	2026-06-05	103.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 19:46:32.727966	CONFIRMADO	\N	\N
e307b3a3-f9dd-45c2-9363-f938d0b9cdd2	47072fb3-68f3-40ed-b1c9-c0f7de542c25	2026-06-05	90.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 19:59:37.512762	CONFIRMADO	\N	\N
0b95ee53-08d9-4335-87a2-fcbc06920e8a	3b8ecbec-dbbf-4fbf-9f3e-f0d62afdcc5e	2026-06-05	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 20:36:44.462646	CONFIRMADO	\N	\N
2e4a0487-00f0-41a2-a79e-aea553b0a93d	c08bf390-9774-490e-b1f7-360ac3e25884	2026-06-05	75.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 20:43:37.56011	CONFIRMADO	\N	\N
17b77a7e-8c3e-4360-8b78-0afcf1ae3bb2	3824d759-cf0f-4ff3-b9e9-7483f1a14ebb	2026-06-05	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 20:57:22.187178	CONFIRMADO	\N	\N
5b3a0a34-6d4c-4251-a32b-3d171370aff7	ceb14f85-9b27-4b09-b9e1-3a52d1861d50	2026-06-05	107.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 21:07:38.870613	CONFIRMADO	\N	\N
7eeace2e-0180-48aa-8d42-d44514c5ef4d	3448c0f3-803c-465d-b886-465ff99220c6	2026-06-05	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 21:50:07.071441	CONFIRMADO	\N	\N
fada94de-18bd-436d-a64b-656c069efad3	b44c8f65-8557-4ad7-a2ce-c37eefa596af	2026-06-05	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 21:50:07.465759	CONFIRMADO	\N	\N
53758f81-7b7d-4243-b74b-320c638a4563	cb890f25-04f2-4d50-986a-351529b5e42c	2026-06-05	153.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 21:55:58.038308	CONFIRMADO	\N	\N
bac26c9e-1ba3-4a5f-a465-604f53d6f91a	fee7055d-d1ba-4fbc-91de-171451ad6cd0	2026-06-05	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 21:58:51.953	CONFIRMADO	\N	\N
c1385e0b-7a29-468a-849f-aaf7813f6094	6fbff5a1-8c87-4495-b94c-abe00546a75a	2026-06-05	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 21:58:52.366631	CONFIRMADO	\N	\N
224115e6-2350-4d8e-a8fb-79695870b883	11d964ed-d7f5-4443-b298-cbf6902e93e8	2026-06-05	40.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 22:44:46.796048	CONFIRMADO	\N	\N
ba00f2a0-86be-4fa7-8e93-21d0cb1fd084	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	2026-06-05	243.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 22:45:26.369104	CONFIRMADO	\N	\N
1b2204aa-7678-4f83-8c8d-3054e4504e97	4311b941-502c-4d62-bed3-900ac6355593	2026-06-05	249.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 22:47:31.301324	CONFIRMADO	\N	\N
87868489-443c-4121-900d-f4a4e365b0df	53a7748a-3fbd-4d71-917e-64064d043f75	2026-06-05	79.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 00:51:55.578642	CONFIRMADO	\N	\N
5e215d19-abc2-4dcf-8a1a-d4a857fce96b	a765161d-1e0f-45f8-b3bd-29c65434ee1f	2026-06-06	49.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 10:59:06.501276	CONFIRMADO	\N	\N
889d95b8-17ba-4064-a5fa-72308f2010ea	b0a7ca7c-2ea1-4b54-a473-e5dc16d99848	2026-06-06	136.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 11:40:17.439972	CONFIRMADO	\N	\N
1bcd8830-6d96-4032-8989-249fb92529ca	3b4e31db-993e-4eff-bc55-5ddc7810c19e	2026-06-06	144.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 13:27:38.950953	CONFIRMADO	\N	\N
cadcf019-7bf4-4c23-859e-39d0a4cbb57b	b17f5f74-fb09-4080-9ff3-38156e7f852e	2026-06-06	29.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 14:07:21.21588	CONFIRMADO	\N	\N
df7ebde5-b3f6-49e3-a74f-7a0578570806	e586b75f-0f41-4998-a4b2-c2667765f1b5	2026-06-06	79.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 14:26:08.255715	CONFIRMADO	\N	\N
4f89e4ab-fc2d-401d-af87-0b5982894337	bd8c6b0a-85a6-47c8-8f0d-6a84752b191f	2026-06-06	0.03	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 15:47:01.704572	CONFIRMADO	\N	\N
5abddff6-1ff6-4b66-b67a-102a953f22d9	5059e1ba-1bca-4abe-bc99-5ddebb3ac2fd	2026-06-06	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:08:35.463307	ESTORNADO	2026-06-06 16:12:33.707+00	Pagamento lançado no cliente errado
5f2e2571-8412-4315-801b-698e30b4f2dc	5fbe936c-300c-49f9-b837-8fa1fdef132c	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:25:49.201204	ESTORNADO	2026-06-06 16:32:38.733+00	Pagamento lançado no cliente errado
f23d28d3-2e65-404b-8559-09b595a6d43a	d15f4ad6-737b-43fe-954c-410345561bea	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:30:53.509022	ESTORNADO	2026-06-06 16:32:43.853+00	Pagamento lançado no cliente errado
06cea83b-8a23-4baa-976b-05d39b217623	86e98ef2-2d19-45d1-b3e4-3b5c8a3146e0	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:20:57.229115	ESTORNADO	2026-06-06 16:32:47.805+00	Pagamento lançado no cliente errado
64da835e-6d0a-4dc1-baf2-cab6f69d1a8c	5059e1ba-1bca-4abe-bc99-5ddebb3ac2fd	2026-06-06	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:15:32.211219	ESTORNADO	2026-06-06 16:32:53.565+00	Pagamento lançado no cliente errado
dfce94f3-065b-4aba-92ad-263e36db82e6	fcb77e8b-7daa-4159-b1db-fc9d1e302e9e	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:01:44.912826	ESTORNADO	2026-06-06 16:33:00.478+00	Pagamento lançado no cliente errado
027a4c7f-789a-42fc-926b-0678e59ebe71	5fbe936c-300c-49f9-b837-8fa1fdef132c	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 17:56:52.952109	ESTORNADO	2026-06-06 18:02:02.712+00	Pagamento lançado no cliente errado
6c4d0b45-2b39-4376-8296-f004f5782d2e	132b7685-6982-4b8e-914a-7cdc9751a047	2026-06-06	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:03:40.076612	ESTORNADO	2026-06-06 16:33:11.534+00	Pagamento lançado no cliente errado
54eeb31f-424f-4ad1-adc3-01c2a4420b5d	f7cd5886-2097-49e3-84ed-ca0337b02ce5	2026-06-06	59.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 17:00:00.937929	CONFIRMADO	\N	\N
8b31895b-a13b-48db-9fe6-6cc3a29f8385	5fbe936c-300c-49f9-b837-8fa1fdef132c	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 17:45:32.08103	ESTORNADO	2026-06-06 17:47:52.96+00	Pagamento lançado no cliente errado
f599ee7f-d41b-4ae7-8f6c-24ad83c6379a	fcb77e8b-7daa-4159-b1db-fc9d1e302e9e	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 18:02:40.342008	CONFIRMADO	\N	\N
ae1da4a2-8fb6-4200-8044-9e9ec7cc7e03	132b7685-6982-4b8e-914a-7cdc9751a047	2026-06-06	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:57:32.682736	ESTORNADO	2026-06-06 17:47:59.832+00	Pagamento lançado no cliente errado
fd289c77-ec0d-4e69-b705-0204a29de4f2	fcb77e8b-7daa-4159-b1db-fc9d1e302e9e	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:52:02.10579	ESTORNADO	2026-06-06 17:48:07.384+00	Pagamento lançado no cliente errado
8f68ce65-0b18-4cbb-95c1-db6ec4b191e2	d15f4ad6-737b-43fe-954c-410345561bea	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:50:37.426806	ESTORNADO	2026-06-06 17:48:12.097+00	Pagamento lançado no cliente errado
f6676a99-0ac6-4661-94c9-7132128b65b6	86e98ef2-2d19-45d1-b3e4-3b5c8a3146e0	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:43:16.01203	ESTORNADO	2026-06-06 18:01:41.744+00	Pagamento lançado no cliente errado
262362f5-d7eb-46b7-9d99-ce20c378757a	5059e1ba-1bca-4abe-bc99-5ddebb3ac2fd	2026-06-06	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:36:11.185411	ESTORNADO	2026-06-06 18:01:47.248+00	Pagamento lançado no cliente errado
9d47f0c3-7c2d-417b-95c2-b485fe34a4a8	fcb77e8b-7daa-4159-b1db-fc9d1e302e9e	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 17:48:56.470223	ESTORNADO	2026-06-06 18:01:52.24+00	Pagamento lançado no cliente errado
68500f30-e898-4325-a36c-a2d000ed8c93	132b7685-6982-4b8e-914a-7cdc9751a047	2026-06-06	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 17:54:10.589254	ESTORNADO	2026-06-06 18:01:56.008+00	Pagamento lançado no cliente errado
6f81a6c0-f296-4c3f-b39b-5539b0bb31e1	d15f4ad6-737b-43fe-954c-410345561bea	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 17:56:10.06069	ESTORNADO	2026-06-06 18:01:59.303+00	Pagamento lançado no cliente errado
4ab42150-526a-4222-88cb-6abc3d0ee551	5059e1ba-1bca-4abe-bc99-5ddebb3ac2fd	2026-06-06	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 18:04:15.657796	CONFIRMADO	\N	\N
ad1e6938-1a1a-4ad0-b615-b7f59c3001f2	4d2125cd-4f8a-48f2-b72f-a1aa1903fadb	2026-06-06	88.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 18:14:55.337039	CONFIRMADO	\N	\N
61972c88-af41-4c81-b519-14111832982c	132b7685-6982-4b8e-914a-7cdc9751a047	2026-06-06	0.02	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 18:25:39.485162	CONFIRMADO	\N	\N
e34b288b-a762-41c5-b79c-2f2f0a11fb6d	86e98ef2-2d19-45d1-b3e4-3b5c8a3146e0	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 18:47:28.733356	CONFIRMADO	\N	\N
88aa4d27-03f9-481a-b6cc-fc1cf2b46c76	07c2f6e1-7cd1-4092-8d73-06f416d02443	2026-06-06	87.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 20:49:37.389601	CONFIRMADO	\N	\N
2112c76d-70cf-42cd-a779-e9c0efcf76d1	a55382f4-8593-4d38-925c-b868fadc1edb	2026-06-06	104.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 21:39:59.535698	CONFIRMADO	\N	\N
829491d3-4186-468e-a08d-0363411bf47b	1598ea2d-b68e-4d24-a1d5-b7f9d6786441	2026-06-07	256.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-07 10:20:13.625365	CONFIRMADO	\N	\N
9a809685-8197-4589-a6f0-3df83eab2ee5	7e86f93c-af47-4c6f-803a-7910534a74b0	2026-06-07	79.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-07 22:27:54.410635	CONFIRMADO	\N	\N
dad03fb1-730d-464c-9d8f-2adcf1a140f7	7cb5731e-fb3b-4e82-bccc-7d82bdd6970f	2026-06-08	79.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 12:50:24.876281	CONFIRMADO	\N	\N
4a2c82ae-8613-4ad8-9c21-82cd7c4a2451	2866a78a-950f-4400-be64-536fcffb8284	2026-06-08	103.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 12:54:40.138016	CONFIRMADO	\N	\N
a08d01c8-de58-48b0-b39f-875cff66b1d2	ab7bb6cf-f885-4332-a021-f169e2867c83	2026-06-08	174.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 12:57:56.124018	CONFIRMADO	\N	\N
d28e3b72-bbaa-4a78-982a-d86c639fa8df	5fbe936c-300c-49f9-b837-8fa1fdef132c	2026-06-08	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 13:22:07.289631	CONFIRMADO	\N	\N
a2ecc0d3-fae2-40e7-b8b5-51d4cc177fad	9cc1b082-e158-4480-8c0f-37da95ef6f5f	2026-06-08	35.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 13:24:43.079986	CONFIRMADO	\N	\N
20a335e0-cf2b-4c52-a2bc-21be7d8c28eb	5eabc7ec-6358-42e6-aa44-10cf4a218a21	2026-06-08	124.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 15:12:59.06538	CONFIRMADO	\N	\N
fd59b954-b3d1-49d9-ba37-f5b31d7113e7	cafc11d3-5460-4046-86c6-ca884b7716ab	2026-06-08	128.00	Link de pagamento	Pagamento registrado pelo Mini ERP	2026-06-08 17:07:06.953817	CONFIRMADO	\N	\N
96b4bbd8-3767-4873-88ad-0936af68fece	f8f1a4d3-13dd-46bd-8ac0-538eda585f07	2026-06-08	79.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 21:17:27.35557	CONFIRMADO	\N	\N
7ed88a1c-c0ef-4fc6-9af0-939d4253bae5	eec2ce01-22f0-40b8-9610-e642d660f659	2026-06-08	40.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 23:14:58.088117	CONFIRMADO	\N	\N
b8a60a86-c52d-44d7-ab58-9fd87fe822a6	ddfea1c7-ec24-4191-aac4-fc2b317c88ed	2026-06-08	119.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 23:14:58.722724	CONFIRMADO	\N	\N
f045a26c-eef7-4de4-832d-30a64597bc00	917f4a98-8a29-4773-ba30-cef04b0e7322	2026-06-08	65.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 23:15:36.26712	ESTORNADO	2026-06-08 23:18:42.098+00	Pagamento lançado no cliente errado
0bf881f0-73f3-4af8-bf94-92901396948f	6756af8f-206e-4c2a-83e7-979117e21cc6	2026-06-08	40.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-08 23:41:36.762584	CONFIRMADO	\N	\N
23de5e3a-b9eb-4aa1-8973-430bed0e0001	a0661cd7-adce-486c-a534-e14fd3d74b2a	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 16:00:52.759801	ESTORNADO	2026-06-10 20:41:14.353+00	Pagamento lançado no cliente errado
66d46ebf-ae6e-416a-acbf-cf5892645f0e	60300d89-35e4-4104-81bf-1b63b95554f5	2026-06-09	55.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-09 13:01:17.023626	CONFIRMADO	\N	\N
7c966f50-a16d-46c0-820b-6af4314e8e18	37731e8c-0880-45b6-9797-e0647e473905	2026-06-09	90.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-09 21:14:59.715918	CONFIRMADO	\N	\N
9b16ce07-a06c-4ac9-9dce-14abdcd8652f	0447e3f1-5e03-4790-8a2d-f79fa31f43c4	2026-06-09	85.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-09 21:26:51.4064	CONFIRMADO	\N	\N
2da338ba-c10d-4702-9523-dcfbf84befa4	bfce3655-80c4-4382-8535-f05da81a5287	2026-06-09	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-09 21:27:12.124448	CONFIRMADO	\N	\N
145cc97f-becb-4a80-9b76-e74d3cfe1051	52f89dda-38f4-4532-b592-c0b1fa2dc31d	2026-06-09	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-09 21:27:28.869575	CONFIRMADO	\N	\N
d3b67fa7-559a-42a0-a0f2-48b2ddc642ba	c351323f-c618-4945-9688-a2787df3b7c8	2026-06-09	49.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-09 21:30:23.347464	CONFIRMADO	\N	\N
c5aaf9e0-4359-4c12-8a90-c7e926883d32	829493cb-5d95-41bc-93d0-c554122c6648	2026-06-09	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-09 21:30:44.379436	CONFIRMADO	\N	\N
054da003-a641-486d-a2cf-76773292d83d	2c1075dc-9dc9-4295-8e48-b1778665753f	2026-06-09	124.00	Débito American | Cielo	Pagamento integral registrado no lançamento da venda	2026-06-09 21:31:17.904822	CONFIRMADO	\N	\N
00c979a0-88aa-4239-a1e2-5128b941d05c	a88c2e14-99a2-489d-820c-5c464f40e440	2026-06-09	55.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-09 21:31:58.199398	CONFIRMADO	\N	\N
a051dae1-0cb2-4b47-bf45-e2be2dcee476	5c0b984b-032a-4afd-bbeb-76936d0f426e	2026-06-09	203.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-09 21:32:37.612353	CONFIRMADO	\N	\N
a7fb6d99-ad4c-4302-a054-5ea989a3c200	9a97508b-6c4f-41e0-a489-6a329392730a	2026-06-09	45.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-09 21:33:28.327731	CONFIRMADO	\N	\N
334c5ae7-a31e-494e-b970-074163ec4e70	6c152211-0dc2-49b9-a4cb-2eefc2679b01	2026-06-09	40.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-09 21:34:40.856085	CONFIRMADO	\N	\N
e3f35614-48e8-4762-bbd3-9933ee87f143	5d7f3e3a-87cd-4481-907f-eb0820510eb3	2026-06-09	75.00	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-06-09 21:37:22.924832	CONFIRMADO	\N	\N
f9ffee11-219e-48ac-9055-874865119fad	982e8c28-69e4-422c-9390-edf1ccf230bb	2026-06-09	116.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-09 21:49:26.674451	CONFIRMADO	\N	\N
e38ea267-6fc9-4806-b356-4a4f38c8dfe2	4b2b949c-764c-4215-9bbb-f9ad11c7e879	2026-06-09	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-09 21:56:00.036991	CONFIRMADO	\N	\N
79d49dac-8aa2-409d-bca0-ad551be44e99	9714ef65-5e8a-4b26-914f-12ad987e091f	2026-06-09	98.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-09 21:56:28.62118	CONFIRMADO	\N	\N
d11db106-52a7-487d-97b8-da0dc3dad30c	c2a14b5a-535f-417d-8961-44b282ce4078	2026-06-09	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-09 21:56:49.406617	CONFIRMADO	\N	\N
fba6af36-6ec6-4465-b49b-ab93b09d3e2b	d7204671-5655-48eb-a393-9244f6a62b79	2026-06-09	50.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 02:24:08.404647	CONFIRMADO	\N	\N
d9881a12-96d5-4f30-b494-0f33dc3e9bf2	e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	2026-06-10	200.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 19:56:43.889704	CONFIRMADO	\N	\N
c3013c88-8602-412f-81e1-e41f460ca049	ddb771af-2a31-4254-a25b-ec32ab5d4978	2026-06-10	35.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 19:58:38.80197	CONFIRMADO	\N	\N
421844e2-a57e-40f4-95d5-6071ab455602	9617c8e6-e71d-4a31-9983-0c4942ca37a3	2026-06-10	276.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 20:01:11.275718	CONFIRMADO	\N	\N
f34360cf-f130-4cf1-8984-b53d04de9582	9b9a1a9f-495b-4db2-b058-8075a1780838	2026-06-10	203.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 20:01:24.124098	CONFIRMADO	\N	\N
52b090df-73fd-44b5-b839-04df47dbd925	2f857e25-830e-4a80-a091-93273f813406	2026-06-10	98.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-10 20:08:45.934639	CONFIRMADO	\N	\N
fbd543f5-2276-48cb-bc27-407566ce793a	1d5b9e36-5dc8-4b37-8a6b-4a4f9466d6f2	2026-06-10	114.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-10 20:09:13.549779	CONFIRMADO	\N	\N
995756bb-c979-4230-a092-6121690e0df3	ab29e939-f2d8-42c8-8740-495ac34b4b72	2026-06-10	150.00	Fiado / Em aberto	Pagamento integral registrado no lançamento da venda	2026-06-10 20:09:34.85497	CONFIRMADO	\N	\N
0d65b439-eec1-4906-8ce8-de285de6ae00	9e3a114e-e4e9-48c1-98f5-d8c2c0b988c1	2026-06-10	58.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-10 20:10:18.185956	CONFIRMADO	\N	\N
a9a9ceec-6165-4b7f-b1c0-3fa122f120df	138e2ada-48cb-4f0f-b591-52c7f95e5c8e	2026-06-10	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-10 20:10:36.807323	CONFIRMADO	\N	\N
45fdd20c-65b6-4398-972d-7cd85eebb56d	e6f194f5-8b65-46bd-bb04-ff1144f14cf2	2026-06-10	170.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-10 20:11:01.606728	CONFIRMADO	\N	\N
8d4766ac-b0dd-45bb-9279-8a2317ccf1a6	508297f7-ff71-4ae5-a37a-87683a63a53c	2026-06-10	107.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-10 20:11:23.231439	CONFIRMADO	\N	\N
6d6ab07c-55d6-4c91-8cdc-f1569877f01c	9d75ae45-2a50-4631-8c6e-251892c6e9b3	2026-06-10	49.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-10 20:12:28.658478	CONFIRMADO	\N	\N
1133b6d0-82b6-4375-ae0b-4058aeb2efb3	31dd3c71-7b58-4625-bb2f-10c62d34c409	2026-06-10	230.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-10 20:15:22.38502	CONFIRMADO	\N	\N
eafddcd3-b460-4253-94ed-f1178aae26d9	65376712-911a-4f50-85f0-1f1024971f2a	2026-06-10	104.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-10 20:16:45.715232	CONFIRMADO	\N	\N
42ac1820-67eb-4841-8cb9-64a5daa027cc	983d4ed5-f93f-45cf-8600-07cba12982de	2026-06-10	65.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-10 20:17:05.248659	CONFIRMADO	\N	\N
ec882203-a605-49d5-9a65-0cd2aa218465	3ce74009-f96c-4bec-af2d-afbf0e656fc0	2026-06-10	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 20:31:48.732627	ESTORNADO	2026-06-10 20:40:51.377+00	Pagamento lançado no cliente errado
08c7e226-423e-480f-b30f-ee9eb239a4ce	d15f4ad6-737b-43fe-954c-410345561bea	2026-06-06	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-06 18:07:20.014776	ESTORNADO	2026-06-10 20:41:03.809+00	Pagamento lançado no cliente errado
e80c130f-333d-4be5-97fb-611c65119f18	a0661cd7-adce-486c-a534-e14fd3d74b2a	2026-06-10	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 20:59:44.627711	ESTORNADO	2026-06-10 21:06:10.931+00	Pagamento lançado no cliente errado
065766ae-bfdf-4833-a617-527a339579e6	3ce74009-f96c-4bec-af2d-afbf0e656fc0	2026-06-10	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 21:04:50.817835	ESTORNADO	2026-06-10 21:19:47.265+00	Pagamento lançado no cliente errado
6fd7480c-7d2e-469b-87da-adf9e5503f45	a0661cd7-adce-486c-a534-e14fd3d74b2a	2026-06-10	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 21:06:21.892103	ESTORNADO	2026-06-10 21:24:51.168+00	Pagamento lançado no cliente errado
0e3b326e-fc40-4498-ab4f-6130513bd254	e20d0b7b-8f22-47a6-9cf3-d926435f3b72	2026-06-04	40.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-05 01:32:42.453643	ESTORNADO	2026-06-11 09:37:04.405+00	Pagamento lançado no cliente errado
a6af1b36-6938-413a-99e8-2dfdb69dfeb6	4e665cc7-c1a7-48f1-aca8-af755e777c04	2026-06-11	200.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-11 10:36:38.355197	CONFIRMADO	\N	\N
120209f5-6e40-40d7-803b-2b2a035a46a5	494e1e85-a3ae-49bc-ad38-dab5e03d5ddd	2026-06-11	125.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-11 19:45:15.427194	CONFIRMADO	\N	\N
e3ffb508-8eae-488f-bada-ba962af13c7a	81402c86-6332-4f13-8931-47b81252c843	2026-06-11	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-11 19:45:35.525363	CONFIRMADO	\N	\N
ce70a430-ec15-449c-bfc3-1c473547232a	9be4d906-9b81-4833-a0df-526ab7ee161f	2026-06-11	158.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-11 19:45:56.126286	CONFIRMADO	\N	\N
d1626c0d-ad40-429d-a04f-2cc7c2a22664	1bb60168-ccc1-46cd-aab0-1ae8cdf638b5	2026-06-11	94.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-11 19:46:16.892809	CONFIRMADO	\N	\N
fe984cf7-f60f-4aa0-b3ba-33154ec104db	9f2a0371-0091-4d47-bc4e-816bc2fbb1d4	2026-06-11	65.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-11 19:46:38.279555	CONFIRMADO	\N	\N
66a8c3ba-3544-4a49-9a79-a28d3455e976	e38dee16-3319-428d-a5a8-29d037672cab	2026-06-11	104.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-11 19:47:05.108794	CONFIRMADO	\N	\N
54c58193-02ad-4e82-9fce-860249fd878a	a0661cd7-adce-486c-a534-e14fd3d74b2a	2026-06-10	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 21:25:00.808405	ESTORNADO	2026-06-13 12:41:25.741+00	Pagamento lançado no cliente errado
f631dd02-da9c-42ac-8879-88922ad531d1	3ce74009-f96c-4bec-af2d-afbf0e656fc0	2026-06-10	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 21:19:56.807812	ESTORNADO	2026-06-13 12:41:32.877+00	Pagamento lançado no cliente errado
95ad4084-e904-41bd-beff-ac5acea63828	4f9a9e90-212c-43ec-adb5-179e1855dd38	2026-06-11	49.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-11 19:47:29.634581	CONFIRMADO	\N	\N
e00c66b0-ea07-46bf-befb-fe707f26e91c	e1bb310a-2280-48cf-b839-faf9b97e328f	2026-06-11	126.00	Crédito Master | Visa	Pagamento integral registrado a partir do Delivery. Taxa: 3,09%.	2026-06-11 19:51:18.644239	CONFIRMADO	\N	\N
8acc671b-a918-4f6b-afec-189e46743ff6	be13abde-81f6-42a3-8bb2-9e69e8e55a46	2026-06-11	183.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-11 20:42:48.470169	CONFIRMADO	\N	\N
5bd31cae-9f74-46be-83a5-f01dcbcf7bbb	7a35056a-e0ce-4ab3-8591-ba082e4f3341	2026-06-11	138.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-12 00:54:42.546861	CONFIRMADO	\N	\N
01ff0433-c79f-4533-8c36-6840851aa2f4	5f087220-0eab-4089-9406-013b7cc37bce	2026-06-12	75.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-12 10:45:51.504926	CONFIRMADO	\N	\N
1ca26ae7-9297-4456-95f6-a25587d13c41	a868c328-38b9-4426-8f19-f561c8f75496	2026-06-12	90.00	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-06-12 14:50:24.182161	CONFIRMADO	\N	\N
6489a209-9897-4c68-9258-69929b576633	01392a0a-fd76-46f4-8fb8-a1ad1f408912	2026-06-13	65.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-13 10:36:02.166358	CONFIRMADO	\N	\N
b5963180-ebb0-4e05-84b3-2f4a8dfed920	ec61269a-cea4-4d1f-a72b-4baa6933c6db	2026-06-13	49.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-13 10:36:02.626867	CONFIRMADO	\N	\N
dcd696b8-edeb-412d-85c2-7c61b4ffa506	d15f4ad6-737b-43fe-954c-410345561bea	2026-06-10	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-10 20:54:44.651555	ESTORNADO	2026-06-13 12:41:17.357+00	Pagamento lançado no cliente errado
71b074e9-9bf9-432e-a4ca-0dde1c5162cd	a0661cd7-adce-486c-a534-e14fd3d74b2a	2026-06-13	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-13 12:43:08.741452	CONFIRMADO	\N	\N
32467211-4d6a-45b6-85d3-8ff65fcc6a6d	d15f4ad6-737b-43fe-954c-410345561bea	2026-06-13	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-13 12:43:09.328965	CONFIRMADO	\N	\N
59679226-d0f6-4a2e-8747-a4c66b424048	33183259-43da-4646-bb65-be12f0217698	2026-06-12	220.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-13 21:53:15.056184	CONFIRMADO	\N	\N
35bd3b03-8291-446e-95bf-aa0e1ee977a5	33183259-43da-4646-bb65-be12f0217698	2026-06-12	220.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-13 22:30:24.788548	CONFIRMADO	\N	\N
19ec45f7-3e49-4f7c-8c80-d15b71793844	33183259-43da-4646-bb65-be12f0217698	2026-06-12	220.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-13 22:30:48.058732	CONFIRMADO	\N	\N
44dda885-d755-4dab-b6ca-6c783613dc48	a868c328-38b9-4426-8f19-f561c8f75496	2026-06-12	98.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-13 22:31:21.493438	CONFIRMADO	\N	\N
ea5a096d-1e48-4f6b-ab6d-1898e7aac17d	63d3f7c4-0d9c-4aa0-8d55-42c85c4ab8dd	2026-06-12	75.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-13 22:33:11.753804	CONFIRMADO	\N	\N
79ef868d-75bf-4267-a3f5-a7012dc4fdb7	45d1b9ca-89f4-429e-8bac-ad0e1c96f576	2026-06-12	115.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-13 22:37:52.9962	CONFIRMADO	\N	\N
4d7e932b-37c5-4419-a33b-c2fa527f5e3f	e4b3d7be-0f93-4909-bdf5-22d46630d8ce	2026-06-12	90.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-13 22:38:50.59211	CONFIRMADO	\N	\N
32e9e28f-68f4-4d45-91bb-3dfc57f9eb71	a1b7449b-46a8-4116-b5a7-b71c042caa7c	2026-06-12	72.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-13 22:39:22.634428	CONFIRMADO	\N	\N
0f50ff31-04f7-4c55-939c-72828a503952	33183259-43da-4646-bb65-be12f0217698	2026-06-12	220.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-13 23:11:23.467593	CONFIRMADO	\N	\N
deef9183-d372-49ba-9cac-0bfd9b6bc788	33183259-43da-4646-bb65-be12f0217698	2026-06-12	220.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-13 23:12:37.20626	CONFIRMADO	\N	\N
69f99661-ba88-4406-9bcc-f6a383aa89e2	a868c328-38b9-4426-8f19-f561c8f75496	2026-06-12	98.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-13 23:12:49.957537	CONFIRMADO	\N	\N
42917148-dd70-4bc8-b0c0-03ccb95f1f80	9aef2e4c-fea4-4676-b500-0e15f8f8909b	2026-06-13	49.00	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-06-14 00:08:52.79258	CONFIRMADO	\N	\N
2fb3d874-8e0d-4026-8fb0-fe69d7d0be1b	86d5d105-491f-4506-aa8e-17ffaf3314c7	2026-06-13	0.01	Pix	Pagamento integral registrado a partir do Delivery. Taxa: 0,00%.	2026-06-14 00:09:57.135043	CONFIRMADO	\N	\N
ce6d116e-e662-4aeb-9d82-f11a0bc8d698	917f4a98-8a29-4773-ba30-cef04b0e7322	2026-06-15	65.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-15 16:31:43.968113	CONFIRMADO	\N	\N
508d5a9b-9285-4ce5-958e-c54b43234cc6	b5b76081-947d-460e-b774-bb1890de5857	2026-06-15	100.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-15 16:32:17.444622	CONFIRMADO	\N	\N
f8e37498-cb1b-4d81-a467-98fddb58d498	139cc867-f499-42ad-8984-8cd681968eca	2026-06-15	163.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 00:02:24.611501	CONFIRMADO	\N	\N
8ba9e951-58fc-4edb-a5ea-98d8795e13da	124b74ce-0a81-4cb5-83cf-6cf334b6e257	2026-06-15	144.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-16 00:05:18.766887	CONFIRMADO	\N	\N
cb4b3ccb-e919-48b2-9ed6-3c034670e34d	0cc4790c-4b81-4dc5-988e-3811a45b4dd2	2026-06-15	58.00	Fiado / Em aberto	Pagamento integral registrado no lançamento da venda	2026-06-16 00:21:34.956587	CONFIRMADO	\N	\N
b7b69d0f-8858-4882-8aac-88dddc94a273	e1232de8-29fa-4046-b6a8-8e25346c3e62	2026-06-15	35.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 00:23:23.014625	CONFIRMADO	\N	\N
34ccb42f-fc4a-437b-ab42-2bdd41d5572e	d2bc1443-14a7-4e18-a34f-c49cbc2a357e	2026-06-15	163.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 00:04:49.685939	ESTORNADO	2026-06-16 00:24:13.648+00	Pagamento lançado no cliente errado
c3121525-9d5e-4e8d-a94a-b3a1a9a84154	d2bc1443-14a7-4e18-a34f-c49cbc2a357e	2026-06-15	163.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-16 01:06:53.916675	CONFIRMADO	\N	\N
eb0229fc-ab16-4829-9dbc-38bbbe9603d6	3ce74009-f96c-4bec-af2d-afbf0e656fc0	2026-06-15	0.01	Pix	Pagamento registrado pelo Mini ERP	2026-06-16 01:07:12.465645	CONFIRMADO	\N	\N
d0a2e30e-fa4c-47f0-ba4a-738f55650185	14e54650-23c1-45c0-8764-6bd5894d2bf8	2026-06-16	90.00	Pix	Pagamento registrado pelo Mini ERP	2026-06-16 13:08:03.168405	CONFIRMADO	\N	\N
ed6431fe-5871-4f8e-8d93-c819e966f06e	d41a615e-2261-4bfc-bbce-2deeb2e49f7a	2026-06-16	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 20:44:07.118422	CONFIRMADO	\N	\N
b3d0d03f-b559-4576-9130-42cf17a28410	ed85ffc6-2b81-46cb-bc7a-482bd3a8ae77	2026-06-16	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 20:45:46.670762	CONFIRMADO	\N	\N
cb94e5f0-eaac-48b6-8a5a-a9f4177f77cf	f8201b23-b068-42a7-b97c-45e67d7f251c	2026-06-16	145.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 20:53:17.029801	CONFIRMADO	\N	\N
c11630a0-0405-4f55-abc6-f0f39acb7611	aa7c28a5-aeea-44d4-af5a-1772b5961807	2026-06-16	120.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 20:53:41.664804	CONFIRMADO	\N	\N
5f90c3ca-166d-4607-abc6-67566fba2f0c	d738277c-7a98-4a29-8485-d454923c703b	2026-06-16	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 20:54:07.396582	CONFIRMADO	\N	\N
abb24f4a-61a4-4187-8567-c6643cf7a17e	c21edf9f-bc50-4b3c-91a7-e303b199d960	2026-06-16	98.00	Crédito American | Elo	Pagamento integral registrado no lançamento da venda	2026-06-16 20:55:17.88144	CONFIRMADO	\N	\N
2ae51a4d-5763-411c-9dd9-8d224fddedf8	9572ae82-7342-4571-9016-0895a4f2ad2c	2026-06-16	100.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 20:55:44.236611	CONFIRMADO	\N	\N
3cc87424-1ca6-49a4-a8e0-b398c95a5cb1	75151dc4-ca46-475d-aa85-da6fe64fd370	2026-06-16	160.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 20:56:18.409351	CONFIRMADO	\N	\N
30dcc0e3-1b9e-4fdc-b859-72814bed86e4	30b738ab-41c1-42de-9ace-431b99554994	2026-06-16	49.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-16 20:56:42.381912	CONFIRMADO	\N	\N
1018f2ac-cef2-4c7b-a8c7-d768da69c02a	058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	2026-06-16	197.00	Crédito American | Elo	Pagamento integral registrado no lançamento da venda	2026-06-16 20:57:38.991151	CONFIRMADO	\N	\N
1cd33f3c-245f-40bf-984b-72745d56b648	067ee613-032c-4f68-98c2-71778c57e51c	2026-06-16	249.00	Crédito Master | Visa	Pagamento registrado pelo Mini ERP	2026-06-16 23:38:09.03872	CONFIRMADO	\N	\N
a9c8b155-5ed1-40a1-ab6a-0046c13cbd34	3e4f7a98-b317-405c-bc26-50494d31bc08	2026-06-17	208.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-17 23:02:11.534188	CONFIRMADO	\N	\N
b37c4d3e-b8c6-4ce6-aaba-7585ef9ebc98	b6be0a68-a492-4cc3-916f-ebb9ba472e95	2026-06-17	108.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-17 23:06:28.463829	CONFIRMADO	\N	\N
14e792f0-e02a-4c83-9ab0-f4f8b4ec3811	bb138231-02db-487b-b43e-4e2959522eaa	2026-06-17	75.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-17 23:06:48.824367	CONFIRMADO	\N	\N
048bef7b-4a3e-44fa-a774-eb823e1571b9	22b95a17-da12-4c53-8325-f8eef6859beb	2026-06-17	219.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-17 23:07:10.807601	CONFIRMADO	\N	\N
96cf5dc7-c4ad-46af-8018-b68b87e0a873	4a95711b-a47c-4476-8891-f2a60b3ed81a	2026-06-17	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-17 23:08:19.720212	CONFIRMADO	\N	\N
33f98df4-37a1-41a8-a335-f234f3f7ab30	da89c6e0-839f-481d-ae61-f977b271577e	2026-06-17	49.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-17 23:08:38.458668	CONFIRMADO	\N	\N
fe7ede41-5aa6-4512-bfd5-afb0333d46cf	0ece79c1-83e1-4ebb-a878-70a8f161e46e	2026-06-18	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-18 22:16:19.34337	CONFIRMADO	\N	\N
a34a403f-886e-49a1-b1f4-2e2efbc75c6b	c08f864c-e23d-410b-92cb-da5cbfc773a8	2026-06-18	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-18 22:16:53.423317	CONFIRMADO	\N	\N
5836decd-6b06-4316-9b66-68a07c571787	3d43151f-df3a-4a6a-b0e1-92b5b56ef2be	2026-06-18	49.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-18 22:20:42.67219	CONFIRMADO	\N	\N
87603eb5-476e-4f4c-8bfb-8bf347d9a808	87913a2e-a1af-4a53-b1f5-49df91ef7f70	2026-06-18	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-18 22:22:07.37484	CONFIRMADO	\N	\N
8236d664-37ed-4462-8d34-18582e0c2b31	f1f03345-129a-49a6-b651-3c4a49a524e9	2026-06-18	92.00	Pix	Pagamento integral registrado no lançamento da venda	2026-06-18 22:22:21.143551	CONFIRMADO	\N	\N
57f50595-5409-4e48-b797-ba7365ec5a18	800be390-8b9f-41ac-8a66-ba77fceb9656	2026-06-18	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-06-18 22:22:49.815326	CONFIRMADO	\N	\N
\.


--
-- Data for Name: pagamentos_backup; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pagamentos_backup (id, venda_id, data_pagamento, valor_pago, forma_pagamento, observacao, created_at) FROM stdin;
ddc6b63e-c633-4d65-8139-89359e1c97bc	0a650d3a-8954-49e9-a234-2f5c03b2f2e9	2026-05-05	98.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:28:39.133464
76c37b78-b3f9-490b-bf45-5fdfc7f36f9b	4ce062e3-07d5-4a1e-9111-b83ce8b602c9	2026-05-05	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:28:54.769031
6c95624e-b9ee-4b66-b64b-36d70d89cdfe	208532fe-ec39-40e8-93ab-3ccede046656	2026-05-05	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:29:10.540625
3bdd0053-4939-48c9-bf7c-20cd253d8bdb	357cb992-7173-4a66-847b-3259299993b0	2026-05-05	84.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:29:29.982601
73e9c62f-39bb-42f0-b64d-737350f69a8d	243fecf8-bc09-4d83-9d7e-92bacfc85d40	2026-05-05	147.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:30:04.792766
f58c4f84-090c-4e79-94f8-9eade143095d	62dd5c44-d634-4e70-bcb8-3a3456754f88	2026-05-05	47.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:30:22.426705
a08f421e-80e1-4975-90d8-0859e06123dc	ce44e86a-d370-49dd-aa3f-b3592ec26e7e	2026-05-05	110.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:30:43.017654
ef0a79e3-f397-49a9-b796-a86b7a81f9db	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	2026-05-05	99.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:31:01.945421
87509fc9-d7b4-418a-99d8-a5b30e0dccc1	00f90737-4a74-4eb1-93fe-d09eddf2b8ed	2026-05-11	196.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:47:38.001754
e1a88726-431d-46dc-834b-d0c49c372b95	ea0e7ffb-b1d9-4224-819b-fd83aab3c4d5	2026-05-11	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:48:48.102912
8150d13f-ba24-4440-be13-0e5992a8e600	81025592-2832-479e-8555-6a90e70d36d9	2026-05-11	90.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:49:07.217869
5d3e2190-07b5-4f32-a8b6-6e91b674a895	1da34841-d09a-4255-a9bd-b2e43821ecb6	2026-05-11	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:49:26.457667
a94d2c70-d1c7-4da1-a06f-5f25609b8b99	b6e2482c-651d-489d-928d-c604363d448b	2026-05-11	89.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:49:46.391915
c8e96d0b-ad25-4c56-bc42-8b2bbb9494d1	5c13f4dc-84dd-4813-9464-790039edb9b4	2026-05-11	90.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:50:07.77019
d32edf66-1088-4351-8025-4b03a8b444d3	1c1b3861-6e36-46b3-8beb-28554d4b4888	2026-05-11	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:50:38.56319
684d5107-2c93-4db9-8600-a122bde426ec	5414f15c-64a6-4006-a786-ef41d4541123	2026-05-11	93.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:51:02.685384
a4d60e2f-3ba4-4c23-8fd2-7f837ba32238	6633fe77-14f9-4bbb-9022-939ffa1e7bc4	2026-05-11	180.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:51:18.96339
bac43642-d84f-4ce7-a45f-f1f89d15b89e	dd8291ac-de40-46a5-945d-f3ae47c5547c	2026-05-12	55.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 00:14:47.242538
25858ff7-7fd6-40cd-b62f-05a72b156d8f	38fa63a9-c781-47f3-952f-78233032a6e8	2026-05-12	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:17:27.151264
53f9a720-7313-40d3-babe-6ffc00802a11	36dbc8cf-2332-4035-8ed4-63ccbf2e6c76	2026-05-12	79.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:18:12.352105
ec15eb6f-b956-401f-91dd-370fbce013a0	918d06f2-c720-4161-a90e-e06196841cdb	2026-05-12	149.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 00:18:37.582694
f057db04-9e24-4276-9748-459bd21e0915	9f18e02d-37e3-429e-af23-c22c7fdb6278	2026-05-12	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:19:01.342379
188be2c1-012c-44e9-9276-b56440794820	4549c2f2-ed62-457a-b494-a016634abe36	2026-05-12	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:19:20.663062
058a3943-d7bc-4cbf-b2dc-32d30d20ddcb	c63805a8-d611-40c4-a060-47f0346b686d	2026-05-12	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:04:34.760543
640d395a-605c-4a36-9a66-154df0ff68a3	d35d1e96-7190-4133-bcb1-b0ec18f8439b	2026-05-12	35.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 02:04:51.053879
8cb24280-09a9-41a4-8a28-57cd4ae912a9	5de02b5b-6cd2-494e-b220-10c610b2d923	2026-05-12	99.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:05:08.347713
798dde19-0709-48bb-b8e4-1b713f2eef70	29d0cd64-ce82-4b49-b6fb-f5493f8443e9	2026-05-12	120.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:05:31.466436
0275f6f5-1b27-453d-b56c-fea604a3b556	f1bb341c-87b0-45cd-b798-94ed71434040	2026-05-12	90.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 02:05:45.838384
73fedb87-e1fa-49d0-bd21-92b5b61e092c	3a078226-8547-4318-b36c-397e06d52499	2026-05-12	58.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:06:14.355693
2e843ad5-819c-4d5e-8282-821821e1f378	e885145f-9610-4b8a-bb6b-8d1b7bbeab63	2026-05-12	100.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 02:06:39.898726
48f9cba2-a102-461b-a4a2-4db422605f94	e3491a28-2022-4d31-b5ef-06c22dbcfc4e	2026-05-12	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:07:03.062415
45bb40ed-e553-46f8-b199-a8e12a17cf35	b81f4153-6d87-4cec-990d-1640330ad6e3	2026-05-12	144.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:07:19.421115
a22b72e5-95b7-401c-bd9b-0d03b7c153f0	5a99cdfb-ac92-447c-adcf-59fc33120e07	2026-05-13	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:44:43.659332
94dcf051-916d-478d-b522-ff4c2ad6c1f0	11fbbfc7-a58e-4efb-8904-c046ecf46791	2026-05-13	216.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:45:16.74621
cdd9191d-0562-4326-89ab-a76487d48b55	d76369c8-7911-4394-adf0-b0b75845ff6d	2026-05-13	124.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:45:46.492676
5311a0f4-274b-4a70-8566-217ea5e733c6	48a6fb1e-4bbe-47a7-9903-2e773b8e2fd5	2026-05-13	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:46:09.873716
4ff20bc6-4ecf-4ae2-93e1-8f737ef2662c	1ba96e44-a35d-4c07-8c75-9f2b89570634	2026-05-13	114.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:46:34.745755
10c4a22c-e48b-4c8d-b09e-f65ef533ad65	ab5f6f14-f0da-4a5b-a06c-03c6bcf65b69	2026-05-13	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:46:55.492703
9f577aa0-5b7e-4141-8d3b-ce52b60b345f	35657dea-72b8-44c5-8e5e-1df3bdf45a1d	2026-05-13	99.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:47:13.942434
a104d025-fe79-4529-be4c-f484eb673429	bbf25b89-d830-4c8f-9bcb-0ab555737d92	2026-05-13	78.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:47:33.006366
7e7fffbf-4153-47ac-93e2-a52d2e2f663d	a80fd83f-cc74-4a28-8ce2-bb721f3dea65	2026-05-14	126.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:47:50.687774
9452a55f-aa78-44ee-b74a-c458af944822	4785e3d7-da1e-40b4-9eb9-d3e7a39723b7	2026-05-14	80.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:48:17.863473
4220cf7a-7192-4eb0-a049-467f7a93d703	f446866d-12e6-414e-9f97-8189ed63c91c	2026-05-14	108.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:48:41.969554
c7cb6b54-b35e-4687-a6e2-b16cad31e470	2b63a779-9e1e-4ba9-a1fa-cb03f5d2346d	2026-05-14	114.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:49:00.510325
8fb4fc46-a031-4f15-94f5-7ea2a109b196	a4bec326-d26b-422a-8792-6f970307f905	2026-05-14	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:49:29.173615
50c94e18-7b89-4aee-bd11-c97eb6026567	4887379e-587d-4bd2-922b-7abd94298aa0	2026-05-14	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:49:53.79991
53a930e8-b1c4-4ca7-9ec5-b62ee4d6d356	b3e653d6-6c94-457e-9898-4f04114849a0	2026-05-14	49.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:50:14.073104
dbc619f1-d732-4821-b350-e07c2980a67f	94f6f425-f794-4600-85ef-d67ef18ce494	2026-05-14	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:50:44.044805
1179a3f6-4fd9-447f-9bd2-e01058d7a33a	e60cc389-50ce-4bee-9706-4fc51250eb33	2026-05-14	49.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:50:59.542482
bbd6210a-8d40-469f-830e-3b767c693081	73f1af8c-b77d-4b2d-8012-7ce6d208f9a5	2026-05-14	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:51:23.012263
d7d503c2-ba8d-43fc-88c8-30c831aabc22	4e10c86d-6028-478f-9706-96005d49ed5c	2026-05-14	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:51:46.439819
bdece8be-de72-4cef-a93d-931b1f81fd28	1555efa1-b985-403a-a09c-131f59b298a1	2026-05-14	65.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:52:04.914882
7a3d15c1-e58a-4547-a1ca-8dc208666326	f15e19b0-01fb-4dc5-88c0-489a0752ddd1	2026-05-14	128.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:52:29.457553
d0443869-5a95-4bbf-8477-be4a6cb80123	82e19cf0-aec6-4120-8b12-e35bbd443c49	2026-05-14	110.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:52:49.402831
ff5f725b-fb96-4630-9ee3-5000da6be701	da99fd7a-5807-4f7f-9188-9a1e72b820f9	2026-05-15	47.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 13:17:09.130339
f0db4c3a-a194-4ff6-b3da-36389ac1bd49	ebce7525-c8a5-428d-84e7-63d899489252	2026-05-15	125.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 13:17:34.30836
58a77b09-4a1b-461d-9bad-2a1e7ab7e6cd	071b922e-f96b-4469-97ec-48ec687fc8e1	2026-05-15	127.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 13:17:55.736273
667d14e6-1a34-4243-9db0-8c826c49a8db	91cc80ea-081e-404c-aa14-50d19c97e79b	2026-05-15	274.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 13:18:14.863038
2032b323-cceb-4e75-b144-cb660ed7d97e	1e8a9988-a7ef-45c5-b883-4f74430c7ebb	2026-05-15	100.00	Fiado / Em aberto	Pagamento parcial registrado no lançamento da venda	2026-05-17 13:20:01.037851
6d51d1c3-982d-462e-9b49-9cad3ea68e79	5eb11394-53b5-4254-821d-45d92f8a0ce6	2026-05-15	78.00	Fiado / Em aberto	Pagamento parcial registrado no lançamento da venda	2026-05-17 13:23:17.813191
1dfb5998-3f5e-4a50-a774-ae708dfe7588	a9afa99a-2862-425c-a640-f673ba14af08	2026-05-18	139.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:11:23.386857
e394a729-4ffb-4c61-82dd-62e766061dca	3dbd3d38-cc5e-47ca-9854-d63183dc861f	2026-05-18	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:11:37.307058
604ec6d4-ca19-47ef-860f-c63bf16d7465	ad2b6ba6-ed56-4942-acb6-c58685c6a825	2026-05-18	89.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-18 19:12:40.948293
0f4e3a57-4402-4d9d-80b6-c6d733176b67	74c5ba81-f6bb-4de3-8ee6-06e53b39b513	2026-05-18	95.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:13:01.413192
3c939598-458a-4076-9a24-9cc95370c23c	53cd6762-d038-4eea-90d5-e352d751e4a5	2026-05-18	213.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:13:20.254158
64061bb6-1f1c-46e3-aba5-7938bd71416d	bab9868f-d987-4ec8-b4e6-6a470e7a241a	2026-05-18	119.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-18 19:15:32.442333
354984e7-202b-4a18-bb7b-5504de74fa03	205b506d-d213-448c-b550-ad847dffb620	2026-05-18	263.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:15:46.584888
0c4145d1-88da-440e-9815-e3eca5caaffd	c1e3a89f-fe3a-4dc1-9a8e-92c2681be6c0	2026-05-19	124.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-19 20:11:18.393274
aa5ee14c-9763-4369-b051-cb97f49eb2b2	3a1a6dec-bcdc-4d27-ae58-dc471ab029d5	2026-05-19	198.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-19 20:11:43.168479
e3cd87f9-360c-4033-a31a-fb41870937cc	c615a94f-bf77-4281-b003-6112ccfe980a	2026-05-19	70.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-19 20:12:04.884992
88b1d235-2c01-4daa-be33-ecaf066bafce	abcebc08-0baa-4aba-bed2-6a857ee7a025	2026-05-19	120.00	Débito American | Cielo	Pagamento integral registrado no lançamento da venda	2026-05-19 20:12:24.306861
8394b5e4-7f29-4968-8e21-c1fc4dff96bd	dbd228e1-f8f6-4df4-960c-d309640d3087	2026-05-19	300.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-19 20:12:45.925622
d21f59a2-cc14-48f8-bc9f-8908bcb53d9f	9abc0afd-0084-45a7-b2bf-bed3bd3e8ae3	2026-05-19	40.00	Débito American | Cielo	Pagamento integral registrado no lançamento da venda	2026-05-19 20:13:01.395229
6dbeff9d-0ff7-4f3b-9d0b-4977ca77e0ea	c0727a2a-a99e-4015-9498-8f42f3689398	2026-05-20	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-20 19:58:34.281188
55696b81-b83f-4609-b26a-74806fdab8ef	b1af8bb9-8e02-4611-a857-7a5f263a8a1c	2026-05-20	80.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:00:19.232263
c8168f6f-9f4c-4aa0-a21b-8350472a8270	8b38c0c2-5904-4309-b725-269c3abc73ca	2026-05-20	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:00:40.91367
5007ae6a-c1ec-4c22-873d-3fb77991b2ed	99fd941f-0ae1-490b-8233-1cadd313612f	2026-05-20	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:01:25.108323
56068833-11db-424b-853c-d8e287d57112	80e50d36-8fe7-4921-9b0d-bf8f3e586548	2026-05-20	35.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-20 20:01:41.867984
8b472879-c39d-44e5-b967-bd4a326751b0	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	2026-05-20	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:02:07.230978
f954b267-b686-4a74-b537-acdcaf30d821	80e50d36-8fe7-4921-9b0d-bf8f3e586548	2026-05-20	35.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-20 21:32:47.413131
2aa13638-9473-4fe8-9a6c-30405a5557d5	489cec38-1522-4fe1-9655-3673a422ed6c	2026-05-22	60.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-22 13:23:18.782241
0d0aae96-890d-4043-9b12-44bf318a4571	900d6999-d493-4c2b-9b8c-e5b9361c2530	2026-05-22	1.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-22 14:09:35.793278
b2506f54-6e9e-4efd-8b32-87799c3169af	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-22	0.50	Pix	Pagamento registrado pelo Mini ERP	2026-05-22 14:30:18.738772
\.


--
-- Data for Name: pagamentos_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pagamentos_backup_20260523 (id, venda_id, data_pagamento, valor_pago, forma_pagamento, observacao, created_at, status, estornado_em, observacao_estorno) FROM stdin;
ddc6b63e-c633-4d65-8139-89359e1c97bc	0a650d3a-8954-49e9-a234-2f5c03b2f2e9	2026-05-05	98.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:28:39.133464	CONFIRMADO	\N	\N
76c37b78-b3f9-490b-bf45-5fdfc7f36f9b	4ce062e3-07d5-4a1e-9111-b83ce8b602c9	2026-05-05	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:28:54.769031	CONFIRMADO	\N	\N
6c95624e-b9ee-4b66-b64b-36d70d89cdfe	208532fe-ec39-40e8-93ab-3ccede046656	2026-05-05	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:29:10.540625	CONFIRMADO	\N	\N
3bdd0053-4939-48c9-bf7c-20cd253d8bdb	357cb992-7173-4a66-847b-3259299993b0	2026-05-05	84.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:29:29.982601	CONFIRMADO	\N	\N
73e9c62f-39bb-42f0-b64d-737350f69a8d	243fecf8-bc09-4d83-9d7e-92bacfc85d40	2026-05-05	147.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:30:04.792766	CONFIRMADO	\N	\N
f58c4f84-090c-4e79-94f8-9eade143095d	62dd5c44-d634-4e70-bcb8-3a3456754f88	2026-05-05	47.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:30:22.426705	CONFIRMADO	\N	\N
a08f421e-80e1-4975-90d8-0859e06123dc	ce44e86a-d370-49dd-aa3f-b3592ec26e7e	2026-05-05	110.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:30:43.017654	CONFIRMADO	\N	\N
ef0a79e3-f397-49a9-b796-a86b7a81f9db	6e7b3f0f-35c4-40b9-843a-e27f79b52a89	2026-05-05	99.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:31:01.945421	CONFIRMADO	\N	\N
87509fc9-d7b4-418a-99d8-a5b30e0dccc1	00f90737-4a74-4eb1-93fe-d09eddf2b8ed	2026-05-11	196.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:47:38.001754	CONFIRMADO	\N	\N
e1a88726-431d-46dc-834b-d0c49c372b95	ea0e7ffb-b1d9-4224-819b-fd83aab3c4d5	2026-05-11	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:48:48.102912	CONFIRMADO	\N	\N
8150d13f-ba24-4440-be13-0e5992a8e600	81025592-2832-479e-8555-6a90e70d36d9	2026-05-11	90.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:49:07.217869	CONFIRMADO	\N	\N
5d3e2190-07b5-4f32-a8b6-6e91b674a895	1da34841-d09a-4255-a9bd-b2e43821ecb6	2026-05-11	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:49:26.457667	CONFIRMADO	\N	\N
a94d2c70-d1c7-4da1-a06f-5f25609b8b99	b6e2482c-651d-489d-928d-c604363d448b	2026-05-11	89.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:49:46.391915	CONFIRMADO	\N	\N
c8e96d0b-ad25-4c56-bc42-8b2bbb9494d1	5c13f4dc-84dd-4813-9464-790039edb9b4	2026-05-11	90.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:50:07.77019	CONFIRMADO	\N	\N
d32edf66-1088-4351-8025-4b03a8b444d3	1c1b3861-6e36-46b3-8beb-28554d4b4888	2026-05-11	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:50:38.56319	CONFIRMADO	\N	\N
684d5107-2c93-4db9-8600-a122bde426ec	5414f15c-64a6-4006-a786-ef41d4541123	2026-05-11	93.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-15 23:51:02.685384	CONFIRMADO	\N	\N
a4d60e2f-3ba4-4c23-8fd2-7f837ba32238	6633fe77-14f9-4bbb-9022-939ffa1e7bc4	2026-05-11	180.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-15 23:51:18.96339	CONFIRMADO	\N	\N
bac43642-d84f-4ce7-a45f-f1f89d15b89e	dd8291ac-de40-46a5-945d-f3ae47c5547c	2026-05-12	55.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 00:14:47.242538	CONFIRMADO	\N	\N
25858ff7-7fd6-40cd-b62f-05a72b156d8f	38fa63a9-c781-47f3-952f-78233032a6e8	2026-05-12	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:17:27.151264	CONFIRMADO	\N	\N
53f9a720-7313-40d3-babe-6ffc00802a11	36dbc8cf-2332-4035-8ed4-63ccbf2e6c76	2026-05-12	79.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:18:12.352105	CONFIRMADO	\N	\N
ec15eb6f-b956-401f-91dd-370fbce013a0	918d06f2-c720-4161-a90e-e06196841cdb	2026-05-12	149.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 00:18:37.582694	CONFIRMADO	\N	\N
f057db04-9e24-4276-9748-459bd21e0915	9f18e02d-37e3-429e-af23-c22c7fdb6278	2026-05-12	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:19:01.342379	CONFIRMADO	\N	\N
188be2c1-012c-44e9-9276-b56440794820	4549c2f2-ed62-457a-b494-a016634abe36	2026-05-12	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 00:19:20.663062	CONFIRMADO	\N	\N
058a3943-d7bc-4cbf-b2dc-32d30d20ddcb	c63805a8-d611-40c4-a060-47f0346b686d	2026-05-12	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:04:34.760543	CONFIRMADO	\N	\N
640d395a-605c-4a36-9a66-154df0ff68a3	d35d1e96-7190-4133-bcb1-b0ec18f8439b	2026-05-12	35.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 02:04:51.053879	CONFIRMADO	\N	\N
8cb24280-09a9-41a4-8a28-57cd4ae912a9	5de02b5b-6cd2-494e-b220-10c610b2d923	2026-05-12	99.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:05:08.347713	CONFIRMADO	\N	\N
798dde19-0709-48bb-b8e4-1b713f2eef70	29d0cd64-ce82-4b49-b6fb-f5493f8443e9	2026-05-12	120.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:05:31.466436	CONFIRMADO	\N	\N
0275f6f5-1b27-453d-b56c-fea604a3b556	f1bb341c-87b0-45cd-b798-94ed71434040	2026-05-12	90.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 02:05:45.838384	CONFIRMADO	\N	\N
73fedb87-e1fa-49d0-bd21-92b5b61e092c	3a078226-8547-4318-b36c-397e06d52499	2026-05-12	58.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:06:14.355693	CONFIRMADO	\N	\N
2e843ad5-819c-4d5e-8282-821821e1f378	e885145f-9610-4b8a-bb6b-8d1b7bbeab63	2026-05-12	100.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 02:06:39.898726	CONFIRMADO	\N	\N
48f9cba2-a102-461b-a4a2-4db422605f94	e3491a28-2022-4d31-b5ef-06c22dbcfc4e	2026-05-12	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:07:03.062415	CONFIRMADO	\N	\N
45bb40ed-e553-46f8-b199-a8e12a17cf35	b81f4153-6d87-4cec-990d-1640330ad6e3	2026-05-12	144.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 02:07:19.421115	CONFIRMADO	\N	\N
a22b72e5-95b7-401c-bd9b-0d03b7c153f0	5a99cdfb-ac92-447c-adcf-59fc33120e07	2026-05-13	89.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:44:43.659332	CONFIRMADO	\N	\N
94dcf051-916d-478d-b522-ff4c2ad6c1f0	11fbbfc7-a58e-4efb-8904-c046ecf46791	2026-05-13	216.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:45:16.74621	CONFIRMADO	\N	\N
cdd9191d-0562-4326-89ab-a76487d48b55	d76369c8-7911-4394-adf0-b0b75845ff6d	2026-05-13	124.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:45:46.492676	CONFIRMADO	\N	\N
5311a0f4-274b-4a70-8566-217ea5e733c6	48a6fb1e-4bbe-47a7-9903-2e773b8e2fd5	2026-05-13	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:46:09.873716	CONFIRMADO	\N	\N
4ff20bc6-4ecf-4ae2-93e1-8f737ef2662c	1ba96e44-a35d-4c07-8c75-9f2b89570634	2026-05-13	114.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:46:34.745755	CONFIRMADO	\N	\N
10c4a22c-e48b-4c8d-b09e-f65ef533ad65	ab5f6f14-f0da-4a5b-a06c-03c6bcf65b69	2026-05-13	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-16 20:46:55.492703	CONFIRMADO	\N	\N
9f577aa0-5b7e-4141-8d3b-ce52b60b345f	35657dea-72b8-44c5-8e5e-1df3bdf45a1d	2026-05-13	99.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:47:13.942434	CONFIRMADO	\N	\N
a104d025-fe79-4529-be4c-f484eb673429	bbf25b89-d830-4c8f-9bcb-0ab555737d92	2026-05-13	78.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-16 20:47:33.006366	CONFIRMADO	\N	\N
7e7fffbf-4153-47ac-93e2-a52d2e2f663d	a80fd83f-cc74-4a28-8ce2-bb721f3dea65	2026-05-14	126.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:47:50.687774	CONFIRMADO	\N	\N
9452a55f-aa78-44ee-b74a-c458af944822	4785e3d7-da1e-40b4-9eb9-d3e7a39723b7	2026-05-14	80.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:48:17.863473	CONFIRMADO	\N	\N
4220cf7a-7192-4eb0-a049-467f7a93d703	f446866d-12e6-414e-9f97-8189ed63c91c	2026-05-14	108.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:48:41.969554	CONFIRMADO	\N	\N
c7cb6b54-b35e-4687-a6e2-b16cad31e470	2b63a779-9e1e-4ba9-a1fa-cb03f5d2346d	2026-05-14	114.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:49:00.510325	CONFIRMADO	\N	\N
8fb4fc46-a031-4f15-94f5-7ea2a109b196	a4bec326-d26b-422a-8792-6f970307f905	2026-05-14	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:49:29.173615	CONFIRMADO	\N	\N
50c94e18-7b89-4aee-bd11-c97eb6026567	4887379e-587d-4bd2-922b-7abd94298aa0	2026-05-14	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:49:53.79991	CONFIRMADO	\N	\N
53a930e8-b1c4-4ca7-9ec5-b62ee4d6d356	b3e653d6-6c94-457e-9898-4f04114849a0	2026-05-14	49.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:50:14.073104	CONFIRMADO	\N	\N
dbc619f1-d732-4821-b350-e07c2980a67f	94f6f425-f794-4600-85ef-d67ef18ce494	2026-05-14	35.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:50:44.044805	CONFIRMADO	\N	\N
1179a3f6-4fd9-447f-9bd2-e01058d7a33a	e60cc389-50ce-4bee-9706-4fc51250eb33	2026-05-14	49.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:50:59.542482	CONFIRMADO	\N	\N
bbd6210a-8d40-469f-830e-3b767c693081	73f1af8c-b77d-4b2d-8012-7ce6d208f9a5	2026-05-14	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:51:23.012263	CONFIRMADO	\N	\N
d7d503c2-ba8d-43fc-88c8-30c831aabc22	4e10c86d-6028-478f-9706-96005d49ed5c	2026-05-14	50.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:51:46.439819	CONFIRMADO	\N	\N
bdece8be-de72-4cef-a93d-931b1f81fd28	1555efa1-b985-403a-a09c-131f59b298a1	2026-05-14	65.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 12:52:04.914882	CONFIRMADO	\N	\N
7a3d15c1-e58a-4547-a1ca-8dc208666326	f15e19b0-01fb-4dc5-88c0-489a0752ddd1	2026-05-14	128.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:52:29.457553	CONFIRMADO	\N	\N
d0443869-5a95-4bbf-8477-be4a6cb80123	82e19cf0-aec6-4120-8b12-e35bbd443c49	2026-05-14	110.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 12:52:49.402831	CONFIRMADO	\N	\N
ff5f725b-fb96-4630-9ee3-5000da6be701	da99fd7a-5807-4f7f-9188-9a1e72b820f9	2026-05-15	47.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 13:17:09.130339	CONFIRMADO	\N	\N
f0db4c3a-a194-4ff6-b3da-36389ac1bd49	ebce7525-c8a5-428d-84e7-63d899489252	2026-05-15	125.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 13:17:34.30836	CONFIRMADO	\N	\N
58a77b09-4a1b-461d-9bad-2a1e7ab7e6cd	071b922e-f96b-4469-97ec-48ec687fc8e1	2026-05-15	127.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-17 13:17:55.736273	CONFIRMADO	\N	\N
667d14e6-1a34-4243-9db0-8c826c49a8db	91cc80ea-081e-404c-aa14-50d19c97e79b	2026-05-15	274.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-17 13:18:14.863038	CONFIRMADO	\N	\N
2032b323-cceb-4e75-b144-cb660ed7d97e	1e8a9988-a7ef-45c5-b883-4f74430c7ebb	2026-05-15	100.00	Fiado / Em aberto	Pagamento parcial registrado no lançamento da venda	2026-05-17 13:20:01.037851	CONFIRMADO	\N	\N
6d51d1c3-982d-462e-9b49-9cad3ea68e79	5eb11394-53b5-4254-821d-45d92f8a0ce6	2026-05-15	78.00	Fiado / Em aberto	Pagamento parcial registrado no lançamento da venda	2026-05-17 13:23:17.813191	CONFIRMADO	\N	\N
1dfb5998-3f5e-4a50-a774-ae708dfe7588	a9afa99a-2862-425c-a640-f673ba14af08	2026-05-18	139.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:11:23.386857	CONFIRMADO	\N	\N
e394a729-4ffb-4c61-82dd-62e766061dca	3dbd3d38-cc5e-47ca-9854-d63183dc861f	2026-05-18	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:11:37.307058	CONFIRMADO	\N	\N
604ec6d4-ca19-47ef-860f-c63bf16d7465	ad2b6ba6-ed56-4942-acb6-c58685c6a825	2026-05-18	89.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-18 19:12:40.948293	CONFIRMADO	\N	\N
0f4e3a57-4402-4d9d-80b6-c6d733176b67	74c5ba81-f6bb-4de3-8ee6-06e53b39b513	2026-05-18	95.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:13:01.413192	CONFIRMADO	\N	\N
3c939598-458a-4076-9a24-9cc95370c23c	53cd6762-d038-4eea-90d5-e352d751e4a5	2026-05-18	213.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:13:20.254158	CONFIRMADO	\N	\N
64061bb6-1f1c-46e3-aba5-7938bd71416d	bab9868f-d987-4ec8-b4e6-6a470e7a241a	2026-05-18	119.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-18 19:15:32.442333	CONFIRMADO	\N	\N
354984e7-202b-4a18-bb7b-5504de74fa03	205b506d-d213-448c-b550-ad847dffb620	2026-05-18	263.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-18 19:15:46.584888	CONFIRMADO	\N	\N
0c4145d1-88da-440e-9815-e3eca5caaffd	c1e3a89f-fe3a-4dc1-9a8e-92c2681be6c0	2026-05-19	124.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-19 20:11:18.393274	CONFIRMADO	\N	\N
aa5ee14c-9763-4369-b051-cb97f49eb2b2	3a1a6dec-bcdc-4d27-ae58-dc471ab029d5	2026-05-19	198.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-19 20:11:43.168479	CONFIRMADO	\N	\N
e3cd87f9-360c-4033-a31a-fb41870937cc	c615a94f-bf77-4281-b003-6112ccfe980a	2026-05-19	70.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-19 20:12:04.884992	CONFIRMADO	\N	\N
88b1d235-2c01-4daa-be33-ecaf066bafce	abcebc08-0baa-4aba-bed2-6a857ee7a025	2026-05-19	120.00	Débito American | Cielo	Pagamento integral registrado no lançamento da venda	2026-05-19 20:12:24.306861	CONFIRMADO	\N	\N
8394b5e4-7f29-4968-8e21-c1fc4dff96bd	dbd228e1-f8f6-4df4-960c-d309640d3087	2026-05-19	300.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-19 20:12:45.925622	CONFIRMADO	\N	\N
d21f59a2-cc14-48f8-bc9f-8908bcb53d9f	9abc0afd-0084-45a7-b2bf-bed3bd3e8ae3	2026-05-19	40.00	Débito American | Cielo	Pagamento integral registrado no lançamento da venda	2026-05-19 20:13:01.395229	CONFIRMADO	\N	\N
6dbeff9d-0ff7-4f3b-9d0b-4977ca77e0ea	c0727a2a-a99e-4015-9498-8f42f3689398	2026-05-20	45.00	Crédito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-20 19:58:34.281188	CONFIRMADO	\N	\N
55696b81-b83f-4609-b26a-74806fdab8ef	b1af8bb9-8e02-4611-a857-7a5f263a8a1c	2026-05-20	80.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:00:19.232263	CONFIRMADO	\N	\N
c8168f6f-9f4c-4aa0-a21b-8350472a8270	8b38c0c2-5904-4309-b725-269c3abc73ca	2026-05-20	55.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:00:40.91367	CONFIRMADO	\N	\N
5007ae6a-c1ec-4c22-873d-3fb77991b2ed	99fd941f-0ae1-490b-8233-1cadd313612f	2026-05-20	40.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:01:25.108323	CONFIRMADO	\N	\N
56068833-11db-424b-853c-d8e287d57112	80e50d36-8fe7-4921-9b0d-bf8f3e586548	2026-05-20	35.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-20 20:01:41.867984	CONFIRMADO	\N	\N
8b472879-c39d-44e5-b967-bd4a326751b0	0fefd213-0ae8-4c8e-8a54-cd47148a1f56	2026-05-20	45.00	Pix	Pagamento integral registrado no lançamento da venda	2026-05-20 20:02:07.230978	CONFIRMADO	\N	\N
f954b267-b686-4a74-b537-acdcaf30d821	80e50d36-8fe7-4921-9b0d-bf8f3e586548	2026-05-20	35.00	Débito Master | Visa	Pagamento integral registrado no lançamento da venda	2026-05-20 21:32:47.413131	CONFIRMADO	\N	\N
2aa13638-9473-4fe8-9a6c-30405a5557d5	489cec38-1522-4fe1-9655-3673a422ed6c	2026-05-22	60.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-22 13:23:18.782241	CONFIRMADO	\N	\N
0d0aae96-890d-4043-9b12-44bf318a4571	900d6999-d493-4c2b-9b8c-e5b9361c2530	2026-05-22	1.00	Pix	Pagamento registrado pelo Mini ERP	2026-05-22 14:09:35.793278	CONFIRMADO	\N	\N
b2506f54-6e9e-4efd-8b32-87799c3169af	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-22	0.50	Pix	Pagamento registrado pelo Mini ERP	2026-05-22 14:30:18.738772	ESTORNADO	2026-05-22 21:31:01.371+00	Pagamento lançado no cliente errado
\.


--
-- Data for Name: pedidos_fornecedor; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pedidos_fornecedor (id, produto_id, produto_nome, fornecedor, quantidade, custo, venda, margem, markup, observacao, status, created_at, ultimo_custo, venda_atual, pedido_grupo_id, salvo) FROM stdin;
\.


--
-- Data for Name: pedidos_fornecedor_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pedidos_fornecedor_backup_20260523 (id, produto_id, produto_nome, fornecedor, quantidade, custo, venda, margem, markup, observacao, status, created_at, ultimo_custo, venda_atual, pedido_grupo_id, salvo) FROM stdin;
3680c10b-803f-4c1f-9d6e-23c456079cf8	0f66560d-f5f4-448a-8f92-f38557369c58	Antepasto Berinjela	Associação | AGRUQUE	4	0	0	50.66666666666667	2.027027027027027	\N	Pendente	2026-05-19 19:18:23.577592+00	22.20	45.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
a8ca8e81-a26c-4a2a-9133-0f200111cdac	127b5028-a4af-4315-b2c3-d3602918a0ba	Doce de Leite Souvivir 	Celeiros de Minas	6	0	0	58.88888888888889	2.4324324324324325	\N	Pendente	2026-05-19 19:18:59.335924+00	18.50	45.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
cbbe41f5-818b-4415-bb87-ab6411eccabf	c14aabde-93dc-44a2-a114-dce69171b34a	Geleia Pimenta UAI 	Celeiros de Minas	12	0	0	68.96551724137932	3.2222222222222223	6 de cada	Pendente	2026-05-19 19:38:31.306055+00	9.00	29.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
284659db-63ef-4f88-bbf1-24ed182e4d5c	150398ab-f4ab-4de2-91bc-6d51d13c8048	kit 3 em 1 Prado E Braga	Associação | AGRUQUE	4	0	0	57.14285714285714	2.3333333333333335	\N	Pendente	2026-05-19 19:38:50.309358+00	21.00	49.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
cf672cf5-b246-4375-a9cd-ec4fa48e655f	0487055c-6183-45da-a5ff-9c46c8ede331	Kit Mix 4 Queijos (Mix)	Associação | AGRUQUE	6	0	0	50.81818181818182	2.033271719038817	\N	Pendente	2026-05-19 19:39:03.195475+00	27.05	55.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
9b7ce559-647c-44ae-9ed2-953f6f80323b	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	Kit Trança Buba Canastra	Buba Canastra	2	0	0	40.17333333333334	1.6714954312458215	\N	Pendente	2026-05-19 19:39:27.025079+00	44.87	75.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
7bbb056f-7421-49db-9236-aa1f164209ce	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	Minas Padrão Via Lat 	Celeiros de Minas	6	0	0	49.63999999999999	1.9857029388403493	\N	Pendente	2026-05-19 19:58:55.390891+00	37.77	75.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
61d04481-dda8-4686-a2d9-f5c207a4fb56	f30b3e28-f290-4954-b818-0a608fa7c654	Minas Padrão Vila  Zero Lactose	Celeiros de Minas	6	0	0	42.58620689655173	1.7417417417417418	\N	Pendente	2026-05-19 19:59:10.040351+00	33.30	58.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
b4511067-082e-44c2-a185-e695c9ff5319	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	Minas Padrão Vila Caipira	Celeiros de Minas	8	0	0	42.82278481012658	1.7489484170909895	\N	Pendente	2026-05-19 19:59:46.057707+00	45.17	79.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
c600a7d7-b37f-4def-aeb5-7f54c3534502	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	Rosquinha de Nata c/ Goiabada	Ândrea | Rosquinhas	12	0	0	55.00000000000001	2.2222222222222223	\N	Pendente	2026-05-19 20:33:29.484908+00	18.00	40.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
16c024c0-5d08-44d5-ac5c-ea0f92729c30	33e15f0e-3fba-49a0-8510-a3a51ce09330	Provolone Des. Goiabada	Celeiros de Minas	12	0	0	54.25	2.1857923497267757	\N	Pendente	2026-05-19 20:33:45.27577+00	18.30	40.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
a900fd49-7f66-4a5b-ba75-9dc84b81d384	d6abbcc3-1287-42b8-9410-b0c303c7bb12	Paçoca	Celeiros de Minas	12	0	0	65.71428571428571	2.9166666666666665	\N	Pendente	2026-05-19 20:34:05.440436+00	12.00	35.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
77bec57a-5ef3-4ed3-9f26-1a9798ef4042	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	Tunguinho	Doces Tanguinho	15	0	0	51.11111111111111	2.0454545454545454	\N	Pendente	2026-05-19 20:34:25.323239+00	22.00	45.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
09747a67-e89c-4610-bd4a-d2fd16a50ddd	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	Minas Frescal R.	Frescal R 	6	0	0	38.775510204081634	1.6333333333333333	\N	Pendente	2026-05-19 20:34:44.807026+00	30.00	49.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
ab56824c-8219-4391-a18a-251c0f7c5082	4338276c-f346-4802-8341-51112846bce7	Kitão c/ Palito Buba Canastra	Buba Canastra	4	0	0	45.02666666666667	1.819063788503517	\N	Pendente	2026-05-19 20:35:23.73862+00	41.23	75.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
ef9c5db2-d212-41ec-b7ca-bfb28901cc34	65c8da1f-3970-46b3-887b-cf6308c80ea6	Reino Bola	Buba Canastra	6	0	0	49.65306122448979	1.9862180786380217	\N	Pendente	2026-05-19 20:35:46.461714+00	24.67	49.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
ab326360-5faf-4bc3-aff2-fcdd275b0deb	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	Provolone Tradicional Defumado	Associação | AGRUQUE	6	0	0	50.91836734693877	2.0374220374220373	\N	Pendente	2026-05-19 20:36:40.020874+00	24.05	49.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
ef0f83f3-deb0-4c33-acca-09642ef39794	beccb773-eb87-44ce-b0d8-7c8e1edea029	Requeijão Raspas Bom da Fazenda	Associação | AGRUQUE	6	0	0	52.84444444444445	2.1206409048067862	\N	Pendente	2026-05-19 20:37:00.019993+00	21.22	45.00	951dbff7-5f25-4b41-bb9f-2be58014a08b	f
91d052a3-6b34-4df7-8b61-f80e91da2794	4338276c-f346-4802-8341-51112846bce7	Kitão c/ Palito Buba Canastra	Buba Canastra	4	0	0	45.02666666666667	1.819063788503517	\N	Pendente	2026-05-20 01:34:13.873306+00	41.23	75.00	\N	f
0f04294f-7d24-4dc2-8c65-70569e7c93e9	0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	Minas Frescal R.	Frescal R 	6	0	0	38.775510204081634	1.6333333333333333	\N	Pendente	2026-05-20 01:34:13.873306+00	30.00	49.00	\N	f
5e78c4e4-0463-47f1-9258-fa8a0bfb7c8c	81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	Tunguinho	Doces Tanguinho	15	0	0	51.11111111111111	2.0454545454545454	\N	Pendente	2026-05-20 01:34:13.873306+00	22.00	45.00	\N	f
75c5bcb1-93d2-4996-bbde-e9007920598c	729b030c-54f8-4cb7-b29e-9ab3a25cd26a	Kit Trança Buba Canastra	Buba Canastra	2	0	0	40.17333333333334	1.6714954312458215	\N	Pendente	2026-05-20 01:34:13.873306+00	44.87	75.00	\N	f
a4c7e7ae-91f1-4186-9033-9c59cfa4d41f	e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	Rosquinha de Nata c/ Goiabada	Ândrea | Rosquinhas	15	0	0	55.00000000000001	2.2222222222222223	\N	Comprado	2026-05-20 01:34:13.873306+00	18.00	40.00	\N	f
780d9ae1-c6ac-41bd-b78d-590251a1675c	0487055c-6183-45da-a5ff-9c46c8ede331	Kit Mix 4 Queijos (Mix)	Associação | AGRUQUE	6	0	0	50.81818181818182	2.033271719038817	\N	Comprado	2026-05-20 01:34:13.873306+00	27.05	55.00	\N	f
6092e8af-9a5c-4bc8-ab50-e841b631fa7f	127b5028-a4af-4315-b2c3-d3602918a0ba	Doce de Leite Souvivir 	Celeiros de Minas	6	0	0	58.88888888888889	2.4324324324324325	\N	Comprado	2026-05-20 01:34:13.873306+00	18.50	45.00	\N	f
a0c045dd-872c-424b-b607-b3d1b762a4b9	0f66560d-f5f4-448a-8f92-f38557369c58	Antepasto Berinjela	Associação | AGRUQUE	4	0	0	50.66666666666667	2.027027027027027	\N	Comprado	2026-05-20 01:34:13.873306+00	22.20	45.00	\N	f
3fa96cbc-f6d0-4f2f-a827-0dc94a1021f4	c14aabde-93dc-44a2-a114-dce69171b34a	Geleia Pimenta UAI 	Celeiros de Minas	12	0	0	68.96551724137932	3.2222222222222223	6 de cada	Comprado	2026-05-20 01:34:13.873306+00	9.00	29.00	\N	f
e1636804-306d-4fa6-9a8e-567f0b58861b	150398ab-f4ab-4de2-91bc-6d51d13c8048	kit 3 em 1 Prado E Braga	Associação | AGRUQUE	4	0	0	57.14285714285714	2.3333333333333335	\N	Comprado	2026-05-20 01:34:13.873306+00	21.00	49.00	\N	f
a44268c6-c2a9-4195-848a-42b5015d414b	0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	Mel Pote	Celeiros de Minas	4	0	0	51.72727272727272	2.071563088512241	\N	Comprado	2026-05-22 12:42:00.211875+00	26.55	55.00	\N	f
aaf3553d-c5e7-409e-af6d-daf9681c59b5	cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	Minas Padrão Via Lat 	Celeiros de Minas	6	0	0	49.63999999999999	1.9857029388403493	\N	Comprado	2026-05-20 01:34:13.873306+00	37.77	75.00	\N	f
a0ee2338-d9bd-498d-8f81-70ad2f1ab949	f30b3e28-f290-4954-b818-0a608fa7c654	Minas Padrão Vila  Zero Lactose	Celeiros de Minas	6	0	0	42.58620689655173	1.7417417417417418	\N	Comprado	2026-05-20 01:34:13.873306+00	33.30	58.00	\N	f
91865c76-d671-4664-927e-404982a5cbae	8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	Minas Padrão Vila Caipira	Celeiros de Minas	8	0	0	42.82278481012658	1.7489484170909895	\N	Comprado	2026-05-20 01:34:13.873306+00	45.17	79.00	\N	f
4279b1c6-d354-4996-b02b-8ce4391d3db0	d6abbcc3-1287-42b8-9410-b0c303c7bb12	Paçoca	Celeiros de Minas	12	0	0	65.71428571428571	2.9166666666666665	\N	Comprado	2026-05-20 01:34:13.873306+00	12.00	35.00	\N	f
0588fd37-4ba2-435b-a1c4-15c83f956673	33e15f0e-3fba-49a0-8510-a3a51ce09330	Provolone Des. Goiabada	Celeiros de Minas	12	0	0	54.25	2.1857923497267757	\N	Comprado	2026-05-20 01:34:13.873306+00	18.30	40.00	\N	f
f075263f-ff26-4f70-93bc-36dc95f4b6e7	ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	Provolone Tradicional Defumado	Associação | AGRUQUE	6	0	0	50.91836734693877	2.0374220374220373	\N	Comprado	2026-05-20 01:34:13.873306+00	24.05	49.00	\N	f
84969472-d7f2-4be9-8286-d362ff17839c	65c8da1f-3970-46b3-887b-cf6308c80ea6	Reino Bola	Buba Canastra	6	0	0	49.65306122448979	1.9862180786380217	\N	Comprado	2026-05-20 01:34:13.873306+00	24.67	49.00	\N	f
05c4d234-b768-441c-b011-b32ddbd23946	beccb773-eb87-44ce-b0d8-7c8e1edea029	Requeijão Raspas Bom da Fazenda	Associação | AGRUQUE	6	0	0	52.84444444444445	2.1206409048067862	\N	Comprado	2026-05-20 01:34:13.873306+00	21.22	45.00	\N	f
\.


--
-- Data for Name: pedidos_fornecedor_grupos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pedidos_fornecedor_grupos (id, data_pedido, total_pecas, total_estimado, fornecedores, status, created_at, fornecedores_count, total_itens, observacao) FROM stdin;
\.


--
-- Data for Name: pendencias; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pendencias (id, venda_id, vencimento, saldo_restante, status, dias_atraso, created_at, cliente_id, origem, observacao_manual) FROM stdin;
ef71fe4d-1599-48c9-a66e-9b64d3baab50	1e8a9988-a7ef-45c5-b883-4f74430c7ebb	2026-06-05	0.00	PAGO	0	2026-05-17 13:20:01.273137	a4c2f8d9-96f8-44eb-b30e-8e34117920fa	VENDA	\N
58c3808a-a058-44b2-829c-60dc0f33c62d	6fd890b0-a3d2-4c7f-b123-cb1de4da9cb8	2026-06-05	0.00	PAGO	0	2026-05-20 19:55:04.407458	d29586e8-6c89-433e-98db-f4da7b77b82f	VENDA	\N
9eb0d095-e281-42f2-8be0-8dc8257678da	8855e32b-2b45-4daa-84f6-5ca9fee4c003	2026-06-05	0.00	PAGO	0	2026-05-20 19:59:52.721691	c19b339d-ce7a-4e00-8213-8030892de285	VENDA	\N
4c1f145c-cb43-4dc7-862b-c92096aced25	92831dfc-add8-4aef-9d8e-d1f065586610	2026-06-05	0.00	PAGO	0	2026-05-16 20:49:07.632916	5218d663-d6a4-494c-9157-77ac26e69629	VENDA	\N
acfbf417-5744-4116-b06b-8eb7f95418c7	55660830-038c-4a2e-8642-efa2395b4390	2026-06-05	144.00	EM ABERTO	0	2026-05-16 00:17:51.235268	e28a90ae-fdfc-4bf8-8a49-a953569e25c5	VENDA	\N
695d93a9-4a2f-4218-bdd8-f61f233146d6	daa1b85e-5bb0-4be0-a67c-83bf41fe1e80	2026-06-05	0.00	PAGO	0	2026-05-16 20:48:39.471987	03a7d684-bb62-4042-881b-6fd70d6b1a92	VENDA	\N
b65aa13e-67ee-4ecd-a008-baa9d46bd1c7	cb890f25-04f2-4d50-986a-351529b5e42c	2026-06-05	0.00	PAGO	0	2026-05-17 12:54:20.1751	fb094592-c779-4046-89f7-f50c2174b4e0	VENDA	\N
91cc250a-bc95-4f1f-b89a-3c2ca6c8bfbc	4311b941-502c-4d62-bed3-900ac6355593	2026-06-05	0.00	PAGO	0	2026-05-16 00:17:10.373397	571f9e26-f977-4785-8824-70156cb777b0	VENDA	\N
eb858a65-04e4-406d-b116-1778704fc9f4	53a7748a-3fbd-4d71-917e-64064d043f75	2026-06-05	0.00	PAGO	0	2026-05-17 13:21:00.216125	1422293c-edb9-405c-9103-83311bcff646	VENDA	\N
c617bdc4-b219-4bf2-aab9-e6518b05e7b9	e586b75f-0f41-4998-a4b2-c2667765f1b5	2026-06-05	0.00	PAGO	0	2026-05-16 20:51:31.730576	9fd43f47-77b1-4352-b6d9-caca865c9b31	VENDA	\N
c61be6b4-a8d1-4c97-a58f-02199a2f3283	f7cd5886-2097-49e3-84ed-ca0337b02ce5	2026-06-05	0.00	PAGO	0	2026-05-17 12:53:47.918581	dc7f62de-22bd-43ed-8b65-449403b44d6f	VENDA	\N
f5b8c914-78cc-40ea-8313-11995a779622	4d2125cd-4f8a-48f2-b72f-a1aa1903fadb	2026-06-05	0.00	PAGO	0	2026-05-17 12:53:21.37968	dcad2126-ab7f-4f45-903c-642941c75bdb	VENDA	\N
f6d92ab5-4f1e-48de-abeb-9d8803c1f764	489cec38-1522-4fe1-9655-3673a422ed6c	2026-06-05	0.00	PAGO	0	2026-05-18 19:16:13.696571	afb4cdb8-05c0-45d8-a16c-69038d0324d4	VENDA	\N
32197ab0-ba39-44ec-af00-6339dceaaf72	900d6999-d493-4c2b-9b8c-e5b9361c2530	2026-06-05	158.00	EM ABERTO	0	2026-05-19 20:13:35.090683	a9e24e8e-2eb9-4ce8-a8ae-2bec251d21e5	VENDA	\N
62207965-89e8-4812-b2bb-8cf101a5c676	a55382f4-8593-4d38-925c-b868fadc1edb	2026-06-05	0.00	PAGO	0	2026-05-17 12:54:44.517936	02118891-e850-4c23-bec7-765f04282b05	VENDA	\N
6a3826c7-5640-461a-84b2-387538841a68	7cb5731e-fb3b-4e82-bccc-7d82bdd6970f	2026-06-05	0.00	PAGO	0	2026-05-19 20:13:58.538999	2935f91f-96ba-46f8-a030-e158181a0b0b	VENDA	\N
da4ab183-c4b8-48e7-8e03-853f7d64293e	ab7bb6cf-f885-4332-a021-f169e2867c83	2026-06-05	0.00	PAGO	0	2026-05-19 20:14:27.459907	0960c594-7067-48c8-b330-49ba276270d9	VENDA	\N
2cbe05d6-4451-4fa1-88e3-4629461a4164	cafc11d3-5460-4046-86c6-ca884b7716ab	2026-06-05	0.00	PAGO	0	2026-05-20 19:59:24.253221	12b03c8f-3695-47a2-966b-1885fa5a1bad	VENDA	\N
2be9cc20-37d7-49c6-b583-32b465080579	f8f1a4d3-13dd-46bd-8ac0-538eda585f07	2026-06-05	0.00	PAGO	0	2026-05-18 19:13:39.18695	dd1ec731-c383-4e80-97a1-0073b187f233	VENDA	\N
71d36e9b-eb79-41e9-9c33-18f5d9561e05	9a97508b-6c4f-41e0-a489-6a329392730a	2026-06-05	0.00	PAGO	0	2026-05-15 23:54:55.476681	541616dd-53c2-433a-b9d0-a0b414f30014	VENDA	\N
1fb5487b-f8c9-4ac7-b063-e1b24d32021a	6c152211-0dc2-49b9-a4cb-2eefc2679b01	2026-06-05	0.00	PAGO	0	2026-05-15 23:54:30.620138	d3056b18-cfbe-4997-b323-72d647901178	VENDA	\N
3db10129-1d0d-4a3a-8cfb-7ba5bd56ce7a	e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	2026-06-10	0.00	PAGO	0	2026-05-17 11:22:53.862641	2ffbcaeb-0676-497f-a625-a809fab32a70	VENDA	\N
f507ce77-9d68-4b6e-92c0-97b19e434ac1	9617c8e6-e71d-4a31-9983-0c4942ca37a3	2026-06-05	0.00	PAGO	0	2026-05-16 20:48:07.145579	94842280-2699-4eb6-a4d4-345b116c5e66	VENDA	\N
693d8ff4-9733-49ea-bd37-0e6f1cd6f92f	9b9a1a9f-495b-4db2-b058-8075a1780838	2026-06-05	0.00	PAGO	0	2026-05-16 20:50:38.246656	de57f20b-3f2b-4b0d-87ff-52299d620358	VENDA	\N
4495e866-ec29-465f-966f-07971783c9d4	5f087220-0eab-4089-9406-013b7cc37bce	2026-06-05	0.00	PAGO	0	2026-05-17 13:20:42.816641	42a31e31-eb48-4fb8-94f7-d93866663b29	VENDA	\N
dda5c613-cc0f-4fbe-b02e-ec094b7c5ccb	88186e76-0361-4f2f-b512-3f4807710514	2026-06-05	0.00	PAGO	0	2026-05-20 20:01:04.048823	0f18dd99-28bb-4fd4-b527-297af713423c	VENDA	\N
4d95a325-c704-43b2-bc97-5298fdad266f	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-22	0.00	PAGO	0	2026-05-22 14:29:53.255071	298c98d7-a412-4fb3-8f48-a026a12ebfdf	VENDA	\N
3c7986aa-c8a4-416e-85b8-626546bab057	2191ee18-3955-4ddb-b9dd-1f564bf4744e	2026-06-05	0.00	PAGO	0	2026-05-16 20:51:07.117916	61c4798c-e0b0-45ae-bc51-4f9e384bc178	VENDA	\N
2124070b-1b0e-453d-80c7-8ca5c92d793e	55a61344-4e59-4aa0-b60d-64cfa135bf57	2026-06-05	0.00	PAGO	0	2026-05-18 19:12:11.25842	0c8d783d-5aea-4277-a7d2-bb88f59952bb	VENDA	\N
e3f30d68-30a1-464f-b8d3-7983d252e5b0	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	2026-06-05	0.00	PAGO	0	2026-05-19 20:18:44.613772	c0aa151d-0aba-4c9a-bc6d-520971eb8f65	VENDA	\N
eb857dba-103b-4577-b635-414f3fb3946c	8264b44e-42e8-4379-b4df-34e0d2b2f19c	2026-06-05	0.00	PAGO	0	2026-05-17 13:19:22.683245	5f619fe7-3076-482c-b100-bc1e30f82aa4	VENDA	\N
30cc80a4-72fe-4d57-9651-ced0cc475171	f65bfdca-b278-4161-a97f-d0513f837923	2026-06-05	0.00	PAGO	0	2026-05-16 20:50:07.266127	b4280181-1d59-425c-96ee-5f4808d46765	VENDA	\N
54e911bc-ccad-4f9e-bbe5-34304d286811	b17f5f74-fb09-4080-9ff3-38156e7f852e	2026-06-08	0.00	PAGO	0	2026-06-05 23:01:12.934289	\N	VENDA	\N
c5c14d59-a62d-42df-9a8d-9320983d1819	bd8c6b0a-85a6-47c8-8f0d-6a84752b191f	2026-06-06	0.00	PAGO	0	2026-06-06 13:30:13.58714	\N	VENDA	\N
41d4f7b3-6a4b-454e-9bdf-cacded7d8ece	6756af8f-206e-4c2a-83e7-979117e21cc6	2026-06-05	0.00	PAGO	0	2026-05-28 20:26:16.571594	\N	VENDA	\N
1eb46a73-5d89-4584-9c6d-25b52fe1be7f	ceb14f85-9b27-4b09-b9e1-3a52d1861d50	2026-06-05	0.00	PAGO	0	2026-05-28 20:00:40.613955	\N	VENDA	\N
02cb994d-12ae-4f95-a5f2-949343818e45	82a1f713-8e07-4123-8cfc-c35ffe0dc766	2026-06-05	0.00	PAGO	0	2026-05-28 19:58:47.669879	\N	VENDA	\N
c7159cbc-0f49-41f9-9438-3050ff1b53e6	\N	2026-05-05	0.00	PAGO	0	2026-05-24 15:01:27.816035	310507da-d7b8-4d78-9975-2a453a6b342d	SALDO_ANTERIOR	Herdado de Planilha antiga
3d9bb7ae-83a5-4281-8283-3fc832c7ce40	0c51ed62-b867-47e8-af6b-81d2d654ebe4	2026-06-05	0.00	PAGO	0	2026-05-28 20:31:14.191213	\N	VENDA	\N
3f3fbc90-8c3c-4760-b9a6-eaee355a0b95	01392a0a-fd76-46f4-8fb8-a1ad1f408912	2026-06-15	0.00	PAGO	0	2026-06-09 21:40:31.952996	\N	VENDA	\N
aeae329e-2210-4146-805b-bea570dff544	5eb11394-53b5-4254-821d-45d92f8a0ce6	2026-06-05	0.00	PAGO	0	2026-05-17 13:23:18.017838	a89b680e-d7af-4473-b7ae-36cafa552e4f	VENDA	\N
8f7914e0-419b-4209-9aea-c6b6808e0e0e	2885ff44-8402-4b7f-879b-415207bd5b46	2026-07-07	70.00	PARCIAL	0	2026-06-04 23:28:32.207794	\N	VENDA	\N
3643f5bc-becf-466b-8e63-0ae798be369f	19951426-4292-458a-bc6c-b5b2fd05c180	2026-06-05	0.00	PAGO	0	2026-05-27 21:41:59.355993	\N	VENDA	\N
222dcca2-9920-4cf7-986e-5d9006aa66c2	4e665cc7-c1a7-48f1-aca8-af755e777c04	2026-06-05	0.00	PAGO	0	2026-05-29 19:47:41.341581	\N	VENDA	\N
e8743581-f5cb-4e02-875d-afd2331c8cd1	85ddf75b-c09a-4ed4-9ebb-b93e2fde87fa	2026-06-30	0.00	PAGO	0	2026-06-04 19:10:06.380105	\N	VENDA	\N
75cfed7d-4d5b-49f7-b2c6-78ce94bd078c	b3707044-3c12-49bd-acaa-153231bc8280	2026-06-05	0.00	PAGO	0	2026-05-28 20:01:02.070843	\N	VENDA	\N
23070dc5-cee8-4ad3-a7b0-93b1d57527bc	67029f1b-4a74-45b4-a605-efd0a611f3b0	2026-06-05	0.00	PAGO	0	2026-06-05 01:49:57.86497	\N	VENDA	\N
e934a7ce-18e9-42a5-ae33-68c641fd23de	d72b87b9-a0a8-4ab4-8bbf-ddcf5c0e1204	2026-06-05	0.00	PAGO	0	2026-05-26 23:23:23.999051	\N	VENDA	\N
1d7d9f56-fa5d-4571-89e2-fc9a5ae6f9a2	b4023362-b74b-4d23-8a6d-c5c8ee026ab7	\N	0.00	PAGO	0	2026-05-29 02:55:54.923305	\N	VENDA	\N
ad97983e-ae6c-4bc9-aee4-23a80cb43649	b1025bbd-811a-439f-883a-5b2ea46b5665	2026-06-04	0.00	PAGO	0	2026-06-05 02:29:16.739052	\N	VENDA	\N
2994440d-772e-4617-8951-bc22543c112c	a8f8dab0-7e43-42aa-9c87-91fba9e9dd4c	2026-06-04	0.00	PAGO	0	2026-06-05 02:42:40.532679	\N	VENDA	\N
4972f50d-ee5e-482e-8fed-93e734b60599	a8f03b27-b9f6-46ef-a603-5db891ff0d5b	2026-06-05	0.00	PAGO	0	2026-05-26 23:25:54.893128	\N	VENDA	\N
f5f1021a-4ee5-4dd9-80a4-854f618ba441	dc0490a5-ab35-40d0-8c1e-5ca428165783	2026-06-08	0.00	PAGO	0	2026-06-04 23:33:34.213955	\N	VENDA	\N
16159f2d-0d6a-4d36-991e-7f0c89aa878b	1db901a8-a06d-47c7-9c39-91f8a6963eea	2026-06-05	0.00	PAGO	0	2026-05-28 20:02:35.803141	\N	VENDA	\N
2ed37a8f-3ec8-454f-9df6-49a4ac87c5fc	e97b26e2-a5f2-4c1e-a63b-5971c081f20c	2026-06-05	0.00	PAGO	0	2026-05-26 23:19:07.286194	\N	VENDA	\N
7e7cab0c-d70f-4803-8f6a-2039bdd91094	8b078770-99de-4d77-bcc3-2e2f1e803e57	2026-06-05	0.00	PAGO	0	2026-05-29 19:54:27.005672	\N	VENDA	\N
66890920-3322-4c87-ad58-7a6882be9a29	06dbafbe-dbe6-4615-a0e9-6a5c3506297c	2026-06-05	0.00	PAGO	0	2026-05-29 19:53:51.233844	\N	VENDA	\N
6653554d-98c8-4cd6-aff6-9de7b945818f	0eabb817-452a-4008-9d6e-9704c614ecbe	2026-06-05	0.00	PAGO	0	2026-05-28 19:59:18.200537	\N	VENDA	\N
e15935ef-2d82-43eb-a208-64b65b404bdd	3d91a855-7ac7-4320-ba75-d4452eb4d6b9	2026-06-01	0.00	PAGO	0	2026-05-26 23:22:52.663135	\N	VENDA	\N
afa85861-66bf-4588-85ce-d6fc67aa4b0e	7785fd56-6559-4658-8c4d-48e6c463d173	2026-06-05	0.00	PAGO	0	2026-05-26 14:48:48.883805	\N	VENDA	\N
04242f0b-033f-431d-9b80-2bc7bf7fdc16	db9e7e21-0a83-47e0-b66d-54c54dec7c8f	2026-06-05	0.00	PAGO	0	2026-05-28 20:25:54.009957	\N	VENDA	\N
4ee95739-966b-493b-bd4f-64c5b40524ab	c5f8d8b9-a19a-476c-8e7b-2cf2a9c077ab	2026-06-08	0.00	PAGO	0	2026-06-04 23:30:50.090363	\N	VENDA	\N
64a33a03-38fd-48a6-b77f-617617dfb505	5a68ddad-3c4c-4e4b-ac38-092350b323f7	2026-06-05	0.00	PAGO	0	2026-05-28 20:00:17.057988	\N	VENDA	\N
6bbc949e-1516-49a7-a796-eac7439f4acc	\N	2026-05-05	0.00	PAGO	0	2026-05-24 15:54:17.904994	1bfbc117-2957-4831-a143-f7c81660c219	SALDO_ANTERIOR	Saldo herdado de planilha antiga
2bc7ab79-8879-49b3-8050-d2ef7f829bc7	47072fb3-68f3-40ed-b1c9-c0f7de542c25	2026-06-05	0.00	PAGO	0	2026-05-27 21:02:47.181176	\N	VENDA	\N
235cc8f7-a54a-4a09-bf7b-8237a2980087	3b8ecbec-dbbf-4fbf-9f3e-f0d62afdcc5e	2026-06-05	0.00	PAGO	0	2026-05-29 23:41:49.014157	\N	VENDA	\N
82357603-266d-49ff-bd64-7bac2c9e99f5	c08bf390-9774-490e-b1f7-360ac3e25884	2026-06-05	0.00	PAGO	0	2026-05-27 20:34:59.789826	\N	VENDA	\N
a0c7c7fa-b68e-4e88-9c0e-e92552ae08c0	3824d759-cf0f-4ff3-b9e9-7483f1a14ebb	2026-06-05	0.00	PAGO	0	2026-06-05 20:46:11.876173	\N	VENDA	\N
c995f2ba-057a-4b4c-ba11-0464e040cf63	3448c0f3-803c-465d-b886-465ff99220c6	2026-06-05	0.00	PAGO	0	2026-06-05 21:40:19.704839	\N	VENDA	\N
2ffaa73f-90b7-40df-86b3-0818e7218124	b44c8f65-8557-4ad7-a2ce-c37eefa596af	2026-06-05	0.00	PAGO	0	2026-06-05 21:20:57.9915	\N	VENDA	\N
c2ed8a31-e587-4e11-b28a-231271d08700	fee7055d-d1ba-4fbc-91de-171451ad6cd0	2026-06-05	0.00	PAGO	0	2026-06-05 21:58:01.262472	\N	VENDA	\N
2b26484b-7192-466a-9625-bf7ac13987ad	6fbff5a1-8c87-4495-b94c-abe00546a75a	2026-06-05	0.00	PAGO	0	2026-06-05 21:57:46.240052	\N	VENDA	\N
42c739e9-b79a-4b9e-b327-5fab09c92138	11d964ed-d7f5-4443-b298-cbf6902e93e8	2026-06-08	0.00	PAGO	0	2026-06-04 23:27:26.176663	\N	VENDA	\N
b02e8cfe-854d-4957-a58c-39094a37f258	47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	2026-06-08	0.00	PAGO	0	2026-06-04 23:01:30.500738	\N	VENDA	\N
11276146-830f-4881-9be9-a20add5cdaf2	a765161d-1e0f-45f8-b3bd-29c65434ee1f	2026-06-05	0.00	PAGO	0	2026-05-28 20:01:47.764474	\N	VENDA	\N
63f16c62-63e6-4b59-bd47-4102b25605be	b0a7ca7c-2ea1-4b54-a473-e5dc16d99848	2026-06-05	0.00	PAGO	0	2026-05-28 20:02:13.204213	\N	VENDA	\N
bd198df7-af01-4610-9be7-ca69cbc4ecb5	3b4e31db-993e-4eff-bc55-5ddc7810c19e	2026-05-20	0.00	PAGO	0	2026-05-24 15:10:33.642295	\N	VENDA	\N
8ff562a7-3aac-4573-a0ca-ad27f91940a9	\N	2026-05-20	0.00	PAGO	0	2026-05-24 15:04:16.05146	e28a90ae-fdfc-4bf8-8a49-a953569e25c5	SALDO_ANTERIOR	Saldo herdado de planilha antiga
01af4805-8d48-40dc-bac0-ee6f06fed81d	d15f4ad6-737b-43fe-954c-410345561bea	2026-06-06	0.00	PAGO	0	2026-06-06 16:06:51.902952	\N	VENDA	\N
7bb8a296-3f92-4a67-99a5-70bce2f045ee	86e98ef2-2d19-45d1-b3e4-3b5c8a3146e0	2026-06-05	0.00	PAGO	0	2026-06-06 16:06:04.635962	\N	VENDA	\N
a8bc0f2b-7307-4892-90ea-a7bf0bfb7148	14e54650-23c1-45c0-8764-6bd5894d2bf8	2026-06-05	0.00	PAGO	0	2026-05-26 14:47:50.876532	\N	VENDA	\N
00b5cdc4-ee94-4124-964c-1dcf04cd72f6	fcb77e8b-7daa-4159-b1db-fc9d1e302e9e	2026-06-01	0.00	PAGO	0	2026-06-06 13:29:36.392049	\N	VENDA	\N
a14b9469-9b0e-4c12-9b7d-3cfc8765ab46	9cc1b082-e158-4480-8c0f-37da95ef6f5f	2026-06-05	0.00	PAGO	0	2026-05-29 19:54:14.934994	\N	VENDA	\N
5fa6d873-b288-4dc2-b57a-5fbfd757566d	5059e1ba-1bca-4abe-bc99-5ddebb3ac2fd	2026-06-04	0.00	PAGO	0	2026-06-06 16:06:31.946969	\N	VENDA	\N
8c74c731-5405-454f-8e4e-5a996df5ea9d	1598ea2d-b68e-4d24-a1d5-b7f9d6786441	2026-06-05	0.00	PAGO	0	2026-05-28 19:39:05.160049	\N	VENDA	\N
999b642f-c7b9-4338-8da4-1a00f7a046e1	07c2f6e1-7cd1-4092-8d73-06f416d02443	2026-06-05	0.00	PAGO	0	2026-05-28 20:26:43.104145	\N	VENDA	\N
15c5bbbc-fc29-44b0-9331-f811d73a9af1	132b7685-6982-4b8e-914a-7cdc9751a047	2026-06-05	0.00	PAGO	0	2026-06-06 13:29:59.004729	\N	VENDA	\N
b7000783-ec25-4cc8-b2ea-22304af53b44	7e86f93c-af47-4c6f-803a-7910534a74b0	2026-06-05	0.00	PAGO	0	2026-05-28 20:24:06.639753	\N	VENDA	\N
8a39142e-b475-4d47-9ac7-f220a8d7fb93	2866a78a-950f-4400-be64-536fcffb8284	2026-06-08	0.00	PAGO	0	2026-06-04 23:32:50.411897	\N	VENDA	\N
7ab7228e-13c7-4b78-9cd8-1c03f15c601e	5fbe936c-300c-49f9-b837-8fa1fdef132c	2026-06-08	0.00	PAGO	0	2026-06-06 01:59:12.893116	\N	VENDA	\N
87974cc6-c39c-443d-9657-c651ffa318ab	5eabc7ec-6358-42e6-aa44-10cf4a218a21	2026-06-05	0.00	PAGO	0	2026-05-28 20:01:25.065135	\N	VENDA	\N
d0a2285b-95b8-4ef3-b720-39d4a7f2ca7d	eec2ce01-22f0-40b8-9610-e642d660f659	2026-06-05	0.00	PAGO	0	2026-05-28 19:40:00.798265	\N	VENDA	\N
f27a762b-d4d7-4f41-803f-1ef2fb39b5c1	ddfea1c7-ec24-4191-aac4-fc2b317c88ed	2026-06-05	0.00	PAGO	0	2026-05-26 14:47:07.256771	\N	VENDA	\N
6494f377-2fa1-484f-9184-97e8a46924b4	b5b76081-947d-460e-b774-bb1890de5857	2026-06-15	0.00	PAGO	0	2026-05-28 19:59:53.332928	\N	VENDA	\N
b16a9e76-96bb-4b81-8631-aaeb74c0ff49	60300d89-35e4-4104-81bf-1b63b95554f5	2026-06-05	0.00	PAGO	0	2026-05-28 20:25:17.252913	\N	VENDA	\N
fa729953-b9a3-412b-892e-247eae9bbb9b	3808084c-39d4-4bb9-8a5b-e098e4685b75	2026-07-08	286.00	EM ABERTO	0	2026-06-09 21:26:18.0544	\N	VENDA	\N
ac3f5416-1bd4-438c-9302-1b0cc6e6658c	b5282b68-3cb9-4a6e-9abd-eb964f0a766b	2026-07-08	108.00	EM ABERTO	0	2026-06-09 21:27:53.683074	\N	VENDA	\N
ed8066c6-3a06-46d0-88ec-e92fb3f5babc	ce44ead9-29f1-4355-b639-b89657c85427	2026-07-08	60.00	EM ABERTO	0	2026-06-09 21:28:12.631904	\N	VENDA	\N
932b2d10-2cf6-4a32-abd8-06d73b513c25	4d367552-4b3e-47c9-bd85-04c32283120b	2026-06-09	0.00	PAGO	0	2026-06-09 21:31:35.907771	\N	VENDA	\N
dd625cf5-0f2c-4868-b3f2-2a202c0e4529	eecc30ce-0a87-48fe-b4c8-e75573b7e20f	2026-07-08	75.00	EM ABERTO	0	2026-06-09 21:38:15.768276	\N	VENDA	\N
daa2e48c-14a0-4747-af90-f1f165df84bf	982e8c28-69e4-422c-9390-edf1ccf230bb	2026-07-08	0.00	PAGO	0	2026-06-09 21:28:40.035875	\N	VENDA	\N
45de435a-ed32-4adc-9b17-b4dc87f3b5cf	ddb771af-2a31-4254-a25b-ec32ab5d4978	2026-07-08	0.00	PAGO	0	2026-06-09 21:57:10.967822	\N	VENDA	\N
9b3f29bd-54f8-45a5-b252-c4f4fea2904d	a0661cd7-adce-486c-a534-e14fd3d74b2a	2026-06-05	0.00	PAGO	0	2026-06-06 00:56:40.337871	\N	VENDA	\N
9863eeed-ed79-4571-a1b3-dab8de209b7a	917f4a98-8a29-4773-ba30-cef04b0e7322	2026-06-15	0.00	PAGO	0	2026-06-04 22:20:21.953081	\N	VENDA	\N
652a4b32-b5e1-44a8-840c-d0431a3712e8	7a35056a-e0ce-4ab3-8591-ba082e4f3341	2026-06-05	0.00	PAGO	0	2026-05-28 20:27:57.587275	\N	VENDA	\N
13b3a492-17a4-410d-b8a2-2bcbd34cef37	ec61269a-cea4-4d1f-a72b-4baa6933c6db	2026-06-15	0.00	PAGO	0	2026-06-04 22:19:56.471209	\N	VENDA	\N
3215517c-c2ba-4b04-ae06-222e67170713	e20d0b7b-8f22-47a6-9cf3-d926435f3b72	2026-06-16	40.00	EM ABERTO	0	2026-06-04 23:31:54.78468	\N	VENDA	\N
c803e96d-dbe2-4422-9d99-f0ff73947744	d7204671-5655-48eb-a393-9244f6a62b79	2026-07-08	0.00	PAGO	0	2026-06-09 21:39:42.471298	\N	VENDA	\N
aab9272d-c4d2-4ca7-8302-be1f45ae0357	46bce739-eacf-4755-af2b-3a0a7a31d919	2026-07-08	168.00	EM ABERTO	0	2026-06-10 20:08:13.589535	\N	VENDA	\N
5aba8fd7-2479-4ac1-94df-08f32bed1b16	a1338d2a-82c6-4223-aabc-e12738e68a5a	2026-07-08	188.00	EM ABERTO	0	2026-06-10 20:09:57.962921	\N	VENDA	\N
94f21489-00b9-4019-9c75-ff923f0d9b40	a84b5989-dbac-4cbe-a0b9-f4d0fdfec89e	2026-07-15	163.00	EM ABERTO	0	2026-06-10 20:11:50.212298	\N	VENDA	\N
18b28f73-90fb-433b-9992-b6881f387588	d2a5badd-479b-4040-8667-4f3fccc739df	2026-07-08	98.00	EM ABERTO	0	2026-06-10 20:13:12.65788	\N	VENDA	\N
7447eed1-95cb-4cfd-b4ea-b465cee10d11	4a444506-0c90-4271-8e29-92aef5d0cae5	2026-07-08	29.00	EM ABERTO	0	2026-06-10 20:13:35.928074	\N	VENDA	\N
e7db38e1-8648-4709-ab81-66def5da95a4	2c3a93c1-f85a-4bbe-8854-554b55cb82c7	2026-07-08	89.00	EM ABERTO	0	2026-06-10 20:14:01.859882	\N	VENDA	\N
756c5fac-4cff-493a-b3c4-69b49b9979bf	58ef46af-90fe-42e6-948c-f4ecb11f5ef5	2026-07-15	98.00	EM ABERTO	0	2026-06-10 20:14:25.926694	\N	VENDA	\N
cbc34d8d-35e9-4ad6-badd-18bebca0b8e3	7d44c7e7-263d-4fac-979d-12ca98a90a7f	2026-07-15	132.00	EM ABERTO	0	2026-06-10 20:14:54.97638	\N	VENDA	\N
18965fe8-d976-40ef-93db-b6cf54666dc0	21dc3079-29a7-4941-8265-91f0e2997890	2026-07-15	49.00	EM ABERTO	0	2026-06-10 20:15:45.664941	\N	VENDA	\N
257b3eab-cf43-4c77-b094-969bc9ec8adf	6cfb6d2e-f15a-40bc-8914-e5c312acb4c6	2026-07-15	77.00	EM ABERTO	0	2026-06-10 20:16:22.402503	\N	VENDA	\N
3da6b6ab-edcb-4f1c-8931-8de35e320ff4	86c5b6e0-e6d1-418f-ae95-c0c39bfe8e4c	2026-07-08	120.00	EM ABERTO	0	2026-06-11 19:44:57.782825	\N	VENDA	\N
3da1c781-b4ff-4e42-9391-30225cde2646	be13abde-81f6-42a3-8bb2-9e69e8e55a46	2026-07-08	0.00	PAGO	0	2026-06-11 19:48:00.776266	\N	VENDA	\N
e716446b-2d7b-468a-a161-1c85ccf01ea4	91944b6e-0fb3-44b3-8c1e-ec0c9fce1d08	2026-07-08	200.00	EM ABERTO	0	2026-06-13 12:44:59.386074	\N	VENDA	\N
357f4a36-b404-404f-b494-1318f3f8807a	44cca7e0-524f-4e30-aef4-a35b736b6c82	2026-07-10	98.00	EM ABERTO	0	2026-06-13 23:07:36.200176	\N	VENDA	\N
b329c65c-3054-4e74-ae5d-2f3cb3af45b9	f57eecc7-f47c-4ad8-9331-6f311a4a1527	2026-07-10	79.00	EM ABERTO	0	2026-06-13 23:06:58.722878	\N	VENDA	\N
af19d994-0043-4b88-8481-9932382f19c2	4449921c-aeed-4e04-b327-f62a4ac3cf13	2026-07-08	55.00	EM ABERTO	0	2026-06-13 23:05:16.295874	\N	VENDA	\N
af24f9f1-e7f8-4548-bb5e-2feb3579fafe	714ab0d8-4a3a-47a5-bd71-3ffc5e3df2de	2026-07-08	49.00	EM ABERTO	0	2026-06-13 23:04:36.899279	\N	VENDA	\N
ff45e00e-1c94-4623-aed6-9d05380e4c96	97c70f44-000d-475a-913e-d6280dec780c	2026-07-09	144.00	EM ABERTO	0	2026-06-16 00:25:30.211645	\N	VENDA	\N
a8834358-449a-4d99-bbce-6a14d5fd298f	cb005a65-26a0-4081-8cda-95f93ee599f6	2026-06-25	291.00	EM ABERTO	0	2026-06-16 00:40:18.128832	\N	VENDA	\N
a8d60631-10b3-4ddf-9b3d-33b1a0b1e7bc	d2bc1443-14a7-4e18-a34f-c49cbc2a357e	\N	0.00	PAGO	0	2026-06-16 00:04:33.020675	\N	VENDA	\N
e3ccca80-5c17-4c1b-8a60-29d5c9666c56	3ce74009-f96c-4bec-af2d-afbf0e656fc0	\N	0.00	PAGO	0	2026-06-10 20:31:32.561909	\N	VENDA	\N
fe0fb959-a951-400b-b36f-30ae754b7a65	067ee613-032c-4f68-98c2-71778c57e51c	2026-06-16	0.00	PAGO	0	2026-06-16 20:47:49.420688	\N	VENDA	\N
1ad49631-7319-416a-814c-d74a28e9c658	8b594967-fdac-422d-980d-e43654743c06	2026-07-08	40.00	EM ABERTO	0	2026-06-17 23:02:43.416793	\N	VENDA	\N
2f4786fb-f6c8-4a4d-9eac-5a78046c6943	940b06a9-011c-433f-9946-dc30ce02a60d	2026-07-08	79.00	EM ABERTO	0	2026-06-17 23:03:29.248303	\N	VENDA	\N
cbac7d37-e6de-4d01-af8f-5bff6b0086e4	e8129165-07e1-4009-aa06-15afde397a77	2026-07-08	79.00	EM ABERTO	0	2026-06-17 23:05:35.099619	\N	VENDA	\N
708b02a5-b076-49ca-92fa-4f614080c142	92bdbf0a-bad4-4a9d-8a0b-420f8cc609ed	2026-07-08	40.00	EM ABERTO	0	2026-06-17 23:06:06.738619	\N	VENDA	\N
4ef68a2a-47bd-4054-82d8-4bba0758c8eb	b51006bb-5ac5-4010-9822-6f1ba902b5a7	2026-07-08	50.00	EM ABERTO	0	2026-06-17 23:07:58.688023	\N	VENDA	\N
8ffe82a9-1c6a-4970-9b52-04c014ec2705	6ccbd4e5-0098-4149-85fb-2f26ddcbb205	2026-07-08	285.00	EM ABERTO	0	2026-06-18 22:04:17.117587	\N	VENDA	\N
408a8de8-b648-43f2-9919-46cb3a24d5f5	0f81a895-d46d-4ec6-9554-90308a9e6af7	2026-07-08	114.00	EM ABERTO	0	2026-06-18 22:12:12.787034	\N	VENDA	\N
a7d5be78-812b-4b59-bb67-3f7967ebedb5	a35f5f4d-3e35-4905-a0c7-1711e9670614	2026-07-08	124.00	EM ABERTO	0	2026-06-18 22:13:55.752367	\N	VENDA	\N
159cb18e-f1d1-4adc-bc4b-40f85481e82d	a6f7902c-9446-46f5-bf96-e801bd14eee7	2026-07-15	55.00	EM ABERTO	0	2026-06-18 22:19:52.130186	\N	VENDA	\N
1a2c90fb-93f3-4957-9582-3b41a253915d	3882f273-03e1-4243-9257-423655975653	2026-07-15	49.00	EM ABERTO	0	2026-06-18 22:18:16.296698	\N	VENDA	\N
427cd990-1aaf-4ad2-b00a-4f711141a4fd	ef0ea975-20bb-4053-abe8-32c4274df224	2026-07-08	94.00	EM ABERTO	0	2026-06-18 22:21:52.290218	\N	VENDA	\N
\.


--
-- Data for Name: pendencias_backup; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pendencias_backup (id, venda_id, vencimento, saldo_restante, status, dias_atraso, created_at) FROM stdin;
2be9cc20-37d7-49c6-b583-32b465080579	f8f1a4d3-13dd-46bd-8ac0-538eda585f07	2026-06-05	79.00	EM ABERTO	0	2026-05-18 19:13:39.18695
2124070b-1b0e-453d-80c7-8ca5c92d793e	55a61344-4e59-4aa0-b60d-64cfa135bf57	2026-06-05	84.00	EM ABERTO	0	2026-05-18 19:12:11.25842
6a3826c7-5640-461a-84b2-387538841a68	7cb5731e-fb3b-4e82-bccc-7d82bdd6970f	2026-06-05	79.00	EM ABERTO	0	2026-05-19 20:13:58.538999
da4ab183-c4b8-48e7-8e03-853f7d64293e	ab7bb6cf-f885-4332-a021-f169e2867c83	2026-06-05	174.00	EM ABERTO	0	2026-05-19 20:14:27.459907
e3f30d68-30a1-464f-b8d3-7983d252e5b0	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	2026-06-05	119.00	EM ABERTO	0	2026-05-19 20:18:44.613772
58c3808a-a058-44b2-829c-60dc0f33c62d	6fd890b0-a3d2-4c7f-b123-cb1de4da9cb8	2026-06-05	45.00	EM ABERTO	0	2026-05-20 19:55:04.407458
2cbe05d6-4451-4fa1-88e3-4629461a4164	cafc11d3-5460-4046-86c6-ca884b7716ab	2026-06-05	128.00	EM ABERTO	0	2026-05-20 19:59:24.253221
9eb0d095-e281-42f2-8be0-8dc8257678da	8855e32b-2b45-4daa-84f6-5ca9fee4c003	2026-06-05	49.00	EM ABERTO	0	2026-05-20 19:59:52.721691
dda5c613-cc0f-4fbe-b02e-ec094b7c5ccb	88186e76-0361-4f2f-b512-3f4807710514	2026-06-05	124.00	EM ABERTO	0	2026-05-20 20:01:04.048823
f6d92ab5-4f1e-48de-abeb-9d8803c1f764	489cec38-1522-4fe1-9655-3673a422ed6c	2026-06-05	0.00	PAGO	0	2026-05-18 19:16:13.696571
32197ab0-ba39-44ec-af00-6339dceaaf72	900d6999-d493-4c2b-9b8c-e5b9361c2530	2026-06-05	158.00	EM ABERTO	0	2026-05-19 20:13:35.090683
4d95a325-c704-43b2-bc97-5298fdad266f	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-22	0.00	PAGO	0	2026-05-22 14:29:53.255071
acfbf417-5744-4116-b06b-8eb7f95418c7	55660830-038c-4a2e-8642-efa2395b4390	2026-06-05	288.00	EM ABERTO	0	2026-05-16 00:17:51.235268
91cc250a-bc95-4f1f-b89a-3c2ca6c8bfbc	4311b941-502c-4d62-bed3-900ac6355593	2026-06-05	249.00	EM ABERTO	0	2026-05-16 00:17:10.373397
71d36e9b-eb79-41e9-9c33-18f5d9561e05	9a97508b-6c4f-41e0-a489-6a329392730a	2026-06-05	45.00	EM ABERTO	0	2026-05-15 23:54:55.476681
1fb5487b-f8c9-4ac7-b063-e1b24d32021a	6c152211-0dc2-49b9-a4cb-2eefc2679b01	2026-06-05	40.00	EM ABERTO	0	2026-05-15 23:54:30.620138
f507ce77-9d68-4b6e-92c0-97b19e434ac1	9617c8e6-e71d-4a31-9983-0c4942ca37a3	2026-06-05	276.00	EM ABERTO	0	2026-05-16 20:48:07.145579
695d93a9-4a2f-4218-bdd8-f61f233146d6	daa1b85e-5bb0-4be0-a67c-83bf41fe1e80	2026-06-05	147.00	EM ABERTO	0	2026-05-16 20:48:39.471987
4c1f145c-cb43-4dc7-862b-c92096aced25	92831dfc-add8-4aef-9d8e-d1f065586610	2026-06-05	89.00	EM ABERTO	0	2026-05-16 20:49:07.632916
30cc80a4-72fe-4d57-9651-ced0cc475171	f65bfdca-b278-4161-a97f-d0513f837923	2026-06-05	59.00	EM ABERTO	0	2026-05-16 20:50:07.266127
693d8ff4-9733-49ea-bd37-0e6f1cd6f92f	9b9a1a9f-495b-4db2-b058-8075a1780838	2026-06-05	203.00	EM ABERTO	0	2026-05-16 20:50:38.246656
3c7986aa-c8a4-416e-85b8-626546bab057	2191ee18-3955-4ddb-b9dd-1f564bf4744e	2026-06-05	174.00	EM ABERTO	0	2026-05-16 20:51:07.117916
c617bdc4-b219-4bf2-aab9-e6518b05e7b9	e586b75f-0f41-4998-a4b2-c2667765f1b5	2026-06-05	79.00	EM ABERTO	0	2026-05-16 20:51:31.730576
3db10129-1d0d-4a3a-8cfb-7ba5bd56ce7a	e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	2026-06-10	155.00	EM ABERTO	0	2026-05-17 11:22:53.862641
f5b8c914-78cc-40ea-8313-11995a779622	4d2125cd-4f8a-48f2-b72f-a1aa1903fadb	2026-06-05	88.00	EM ABERTO	0	2026-05-17 12:53:21.37968
c61be6b4-a8d1-4c97-a58f-02199a2f3283	f7cd5886-2097-49e3-84ed-ca0337b02ce5	2026-06-05	59.00	EM ABERTO	0	2026-05-17 12:53:47.918581
b65aa13e-67ee-4ecd-a008-baa9d46bd1c7	cb890f25-04f2-4d50-986a-351529b5e42c	2026-06-05	153.00	EM ABERTO	0	2026-05-17 12:54:20.1751
62207965-89e8-4812-b2bb-8cf101a5c676	a55382f4-8593-4d38-925c-b868fadc1edb	2026-06-05	104.00	EM ABERTO	0	2026-05-17 12:54:44.517936
eb857dba-103b-4577-b635-414f3fb3946c	8264b44e-42e8-4379-b4df-34e0d2b2f19c	2026-06-05	237.00	EM ABERTO	0	2026-05-17 13:19:22.683245
ef71fe4d-1599-48c9-a66e-9b64d3baab50	1e8a9988-a7ef-45c5-b883-4f74430c7ebb	2026-06-05	99.00	PARCIAL	0	2026-05-17 13:20:01.273137
4495e866-ec29-465f-966f-07971783c9d4	5f087220-0eab-4089-9406-013b7cc37bce	2026-06-05	75.00	EM ABERTO	0	2026-05-17 13:20:42.816641
eb858a65-04e4-406d-b116-1778704fc9f4	53a7748a-3fbd-4d71-917e-64064d043f75	2026-06-05	79.00	EM ABERTO	0	2026-05-17 13:21:00.216125
aeae329e-2210-4146-805b-bea570dff544	5eb11394-53b5-4254-821d-45d92f8a0ce6	2026-06-05	78.00	PARCIAL	0	2026-05-17 13:23:18.017838
\.


--
-- Data for Name: pendencias_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pendencias_backup_20260523 (id, venda_id, vencimento, saldo_restante, status, dias_atraso, created_at) FROM stdin;
2be9cc20-37d7-49c6-b583-32b465080579	f8f1a4d3-13dd-46bd-8ac0-538eda585f07	2026-06-05	79.00	EM ABERTO	0	2026-05-18 19:13:39.18695
2124070b-1b0e-453d-80c7-8ca5c92d793e	55a61344-4e59-4aa0-b60d-64cfa135bf57	2026-06-05	84.00	EM ABERTO	0	2026-05-18 19:12:11.25842
6a3826c7-5640-461a-84b2-387538841a68	7cb5731e-fb3b-4e82-bccc-7d82bdd6970f	2026-06-05	79.00	EM ABERTO	0	2026-05-19 20:13:58.538999
da4ab183-c4b8-48e7-8e03-853f7d64293e	ab7bb6cf-f885-4332-a021-f169e2867c83	2026-06-05	174.00	EM ABERTO	0	2026-05-19 20:14:27.459907
e3f30d68-30a1-464f-b8d3-7983d252e5b0	a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	2026-06-05	119.00	EM ABERTO	0	2026-05-19 20:18:44.613772
58c3808a-a058-44b2-829c-60dc0f33c62d	6fd890b0-a3d2-4c7f-b123-cb1de4da9cb8	2026-06-05	45.00	EM ABERTO	0	2026-05-20 19:55:04.407458
2cbe05d6-4451-4fa1-88e3-4629461a4164	cafc11d3-5460-4046-86c6-ca884b7716ab	2026-06-05	128.00	EM ABERTO	0	2026-05-20 19:59:24.253221
9eb0d095-e281-42f2-8be0-8dc8257678da	8855e32b-2b45-4daa-84f6-5ca9fee4c003	2026-06-05	49.00	EM ABERTO	0	2026-05-20 19:59:52.721691
dda5c613-cc0f-4fbe-b02e-ec094b7c5ccb	88186e76-0361-4f2f-b512-3f4807710514	2026-06-05	124.00	EM ABERTO	0	2026-05-20 20:01:04.048823
f6d92ab5-4f1e-48de-abeb-9d8803c1f764	489cec38-1522-4fe1-9655-3673a422ed6c	2026-06-05	0.00	PAGO	0	2026-05-18 19:16:13.696571
32197ab0-ba39-44ec-af00-6339dceaaf72	900d6999-d493-4c2b-9b8c-e5b9361c2530	2026-06-05	158.00	EM ABERTO	0	2026-05-19 20:13:35.090683
4d95a325-c704-43b2-bc97-5298fdad266f	5e3e2e43-8f4c-4697-b516-c7448ec088f0	2026-05-22	0.50	EM ABERTO	0	2026-05-22 14:29:53.255071
acfbf417-5744-4116-b06b-8eb7f95418c7	55660830-038c-4a2e-8642-efa2395b4390	2026-06-05	288.00	EM ABERTO	0	2026-05-16 00:17:51.235268
91cc250a-bc95-4f1f-b89a-3c2ca6c8bfbc	4311b941-502c-4d62-bed3-900ac6355593	2026-06-05	249.00	EM ABERTO	0	2026-05-16 00:17:10.373397
71d36e9b-eb79-41e9-9c33-18f5d9561e05	9a97508b-6c4f-41e0-a489-6a329392730a	2026-06-05	45.00	EM ABERTO	0	2026-05-15 23:54:55.476681
1fb5487b-f8c9-4ac7-b063-e1b24d32021a	6c152211-0dc2-49b9-a4cb-2eefc2679b01	2026-06-05	40.00	EM ABERTO	0	2026-05-15 23:54:30.620138
f507ce77-9d68-4b6e-92c0-97b19e434ac1	9617c8e6-e71d-4a31-9983-0c4942ca37a3	2026-06-05	276.00	EM ABERTO	0	2026-05-16 20:48:07.145579
695d93a9-4a2f-4218-bdd8-f61f233146d6	daa1b85e-5bb0-4be0-a67c-83bf41fe1e80	2026-06-05	147.00	EM ABERTO	0	2026-05-16 20:48:39.471987
4c1f145c-cb43-4dc7-862b-c92096aced25	92831dfc-add8-4aef-9d8e-d1f065586610	2026-06-05	89.00	EM ABERTO	0	2026-05-16 20:49:07.632916
30cc80a4-72fe-4d57-9651-ced0cc475171	f65bfdca-b278-4161-a97f-d0513f837923	2026-06-05	59.00	EM ABERTO	0	2026-05-16 20:50:07.266127
693d8ff4-9733-49ea-bd37-0e6f1cd6f92f	9b9a1a9f-495b-4db2-b058-8075a1780838	2026-06-05	203.00	EM ABERTO	0	2026-05-16 20:50:38.246656
3c7986aa-c8a4-416e-85b8-626546bab057	2191ee18-3955-4ddb-b9dd-1f564bf4744e	2026-06-05	174.00	EM ABERTO	0	2026-05-16 20:51:07.117916
c617bdc4-b219-4bf2-aab9-e6518b05e7b9	e586b75f-0f41-4998-a4b2-c2667765f1b5	2026-06-05	79.00	EM ABERTO	0	2026-05-16 20:51:31.730576
3db10129-1d0d-4a3a-8cfb-7ba5bd56ce7a	e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	2026-06-10	155.00	EM ABERTO	0	2026-05-17 11:22:53.862641
f5b8c914-78cc-40ea-8313-11995a779622	4d2125cd-4f8a-48f2-b72f-a1aa1903fadb	2026-06-05	88.00	EM ABERTO	0	2026-05-17 12:53:21.37968
c61be6b4-a8d1-4c97-a58f-02199a2f3283	f7cd5886-2097-49e3-84ed-ca0337b02ce5	2026-06-05	59.00	EM ABERTO	0	2026-05-17 12:53:47.918581
b65aa13e-67ee-4ecd-a008-baa9d46bd1c7	cb890f25-04f2-4d50-986a-351529b5e42c	2026-06-05	153.00	EM ABERTO	0	2026-05-17 12:54:20.1751
62207965-89e8-4812-b2bb-8cf101a5c676	a55382f4-8593-4d38-925c-b868fadc1edb	2026-06-05	104.00	EM ABERTO	0	2026-05-17 12:54:44.517936
eb857dba-103b-4577-b635-414f3fb3946c	8264b44e-42e8-4379-b4df-34e0d2b2f19c	2026-06-05	237.00	EM ABERTO	0	2026-05-17 13:19:22.683245
ef71fe4d-1599-48c9-a66e-9b64d3baab50	1e8a9988-a7ef-45c5-b883-4f74430c7ebb	2026-06-05	99.00	PARCIAL	0	2026-05-17 13:20:01.273137
4495e866-ec29-465f-966f-07971783c9d4	5f087220-0eab-4089-9406-013b7cc37bce	2026-06-05	75.00	EM ABERTO	0	2026-05-17 13:20:42.816641
eb858a65-04e4-406d-b116-1778704fc9f4	53a7748a-3fbd-4d71-917e-64064d043f75	2026-06-05	79.00	EM ABERTO	0	2026-05-17 13:21:00.216125
aeae329e-2210-4146-805b-bea570dff544	5eb11394-53b5-4254-821d-45d92f8a0ce6	2026-06-05	78.00	PARCIAL	0	2026-05-17 13:23:18.017838
\.


--
-- Data for Name: prevendas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.prevendas (id, cliente_nome, referencia, itens, total, transcricao, status, mensagem_gerada, created_at, updated_at, forma_pagamento) FROM stdin;
dc9e3ed3-347d-45bd-8cea-2a07fc19c061	Carla	EP 210 Norte	[{"nome": "Vila Caipira Zero Lactose", "valor": 58, "subtotal": 58, "quantidade": 1, "valorUnitario": 58}]	58.00	Carla um Vila Caipira zero lactose R$58	Venda convertida	f	2026-06-15 13:03:20.312408+00	2026-06-16 00:21:34.699+00	\N
32a8b9ea-561d-4a7a-9665-c67f0ba73d6c	Maria Lúcia	EP 210 Norte	[{"nome": "Parmesã Capa Preta", "valor": 65, "subtotal": 65, "quantidade": 1, "valorUnitario": 65}, {"nome": "Vila Caipira", "valor": 79, "subtotal": 79, "quantidade": 1, "valorUnitario": 79}]	144.00	Maria Lúcia um parmesão capa preta R$65 um Vila Caipira R$79	Venda convertida	f	2026-06-15 13:02:35.404081+00	2026-06-16 00:25:29.816+00	\N
6092814e-6223-4fbb-be8b-2e329b8deb14	Adriana	Regional	[{"nome": "Vila Caipira", "valor": 79, "subtotal": 79, "quantidade": 1, "valorUnitario": 79}, {"nome": "Um Provolone Com Picanha", "valor": 65, "subtotal": 65, "quantidade": 1, "valorUnitario": 65}]	144.00	Adriana Secretaria 1,1 Vila Caipira R$79 e um Provolone com picanha R$65	Convertida	f	2026-06-15 14:12:46.986614+00	2026-06-16 00:26:34.063+00	\N
8043c4b1-b9bb-419d-8a82-b320ac910541	Rosângela Falta Entregar		[{"nome": "Cocada Cremosa", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}, {"nome": "Mocotó", "valor": 39, "subtotal": 39, "quantidade": 1, "valorUnitario": 39}, {"nome": "Vila Caipira", "valor": 79, "subtotal": 79, "quantidade": 1, "valorUnitario": 79}]	167.00	Rosângela falta entregar Uma cocada cremosa R$49 um mocotó R$39	Delivery programado	f	2026-06-15 12:28:41.117177+00	2026-06-16 01:13:21.248+00	Fiado / Em aberto
8ff434b4-c830-475b-be29-6bb123d9814e	Rosângela	EP 210 Norte	[{"nome": "Parmesã", "valor": 65, "subtotal": 65, "quantidade": 1, "valorUnitario": 65}, {"nome": "Vila Caipira", "valor": 79, "subtotal": 79, "quantidade": 1, "valorUnitario": 79}, {"nome": "Requeijã Tradicional", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}, {"nome": "Coalho", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}, {"nome": "Doce Leite", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	291.00	Rosângela um parmesão R$65 dois Vila Caipira R$79 um requeijão tradicional R$49 um coalho R$49 um doce de leite R$49	Venda convertida	f	2026-06-15 12:28:15.386355+00	2026-06-16 00:40:57.303+00	
ec8b99ee-d309-40ca-817c-c2219ebd4793	Andreza	EC 405 Norte	[{"nome": "Tranç Cascavel", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	49.00	Andreza referência e C 405 norte itens adquiridos uma trança Cascavel R$49 forma de pagamento crédito	Venda convertida	f	2026-06-17 22:37:33.231757+00	2026-06-17 23:08:38.421+00	Crédito
fe0d8f76-9ca2-4038-ad54-d3c5c0d5a388	Maria Lúcia	EP 210 Norte	[{"nome": "Café Saga", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}]	55.00	Maria Lúcia um café saga R$55 falta entregar	Delivery programado	f	2026-06-15 13:12:41.133198+00	2026-06-16 01:00:11.563+00	\N
88b1cd57-488f-410a-9fec-964c17402bc3	Aline	EP 210 Norte	[{"nome": "Desidratado", "valor": 35, "subtotal": 35, "quantidade": 1, "valorUnitario": 35}]	35.00	Aline um desidratado por R$35	Venda convertida	f	2026-06-15 12:55:34.084694+00	2026-06-16 01:05:08.31+00	Pix
d0b84232-0854-4e6d-a96d-2557576540f7	Sandra	CEDLAN	[{"nome": "Meu Pote", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}, {"nome": "Requeijã Tradicional", "valor": 50, "subtotal": 50, "quantidade": 1, "valorUnitario": 50}, {"nome": "Parmesã", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}]	160.00	Cliente Sandra itens adquiridos o meu pote R$55 um requeijão tradicional R$49 um parmesão R$61	Venda convertida	f	2026-06-16 12:51:46.127177+00	2026-06-16 20:56:18.376+00	Pix
de2bae17-1991-4c23-8d48-81002414e6c3	Isabela	CEDLAN	[{"nome": "Lombinho Tradicional", "valor": 50, "subtotal": 50, "quantidade": 1, "valorUnitario": 50}]	50.00	Cliente Isabela itens adquirido um coalho R$49 um prazo e Braga R$49 forma de pagamento fiado	Delivery programado	f	2026-06-16 14:29:15.077752+00	2026-06-16 20:39:56.946+00	Fiado / Em aberto
67a25aad-4877-4842-9f28-b5a1675f8a4d	Henrique	CEDLAN	[{"nome": "Antepasto Berinjela", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	49.00	Cliente Henrique itens adquiridos um antepasto de berinjela R$49 forma de pagamento Pix	Delivery programado	f	2026-06-16 12:50:38.697084+00	2026-06-16 20:41:13.837+00	Pix
51a26e1e-bd34-4701-975f-06d8ba44dbd1	Luciana	CEDLAN	[{"nome": "Desidratado Com Goiaba", "valor": 40, "subtotal": 40, "quantidade": 1, "valorUnitario": 40}]	40.00	Luciana itens adquiridos um desidratado com goiaba R$40 forma de pagamento Pix	Venda convertida	f	2026-06-16 14:39:57.145848+00	2026-06-16 20:44:07.066+00	Pix
d607db66-5755-49c5-8d6e-a0a036703911	Kika	EP 304 Norte	[{"nome": "Requeijã Búfala", "valor": 110, "subtotal": 110, "quantidade": 2, "valorUnitario": 55}, {"nome": "Trufado Azeitona", "valor": 65, "subtotal": 65, "quantidade": 1, "valorUnitario": 65}, {"nome": "Kit Mix", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}, {"nome": "Mussarela de Búfala", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}]	285.00	Cliente Kika referência 304 norte itens adquiridos dois requeijão de búfala R$55 um trufado azeitona R$65 um kit Mix R$55	Delivery programado	f	2026-06-16 14:06:54.619877+00	2026-06-16 20:52:31.119+00	Fiado / Em aberto
fc060460-c6d8-4d60-b87d-730224eac6c8	Viviane	CEDLAN	[{"nome": "Desidratado Com Goiaba", "valor": 120, "subtotal": 120, "quantidade": 3, "valorUnitario": 40}]	120.00	Cliente Viviane itens adquiridos três desidratado com goiaba R$40 forma de pagamento Pix	Venda convertida	f	2026-06-16 13:43:41.434486+00	2026-06-16 20:53:41.836+00	Pix
01f03297-98a4-4114-a104-7330351f7559	Renata	CEDLAN	[{"nome": "Tranç Cascavel", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}, {"nome": "Requeijã Tradicional", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	98.00	Cliente Renata referência CDA itens adquiridos uma trança Cascavel R$49 um requeijão tradicional R$49	Venda convertida	f	2026-06-16 13:21:23.176884+00	2026-06-16 20:55:17.833+00	Crédito
aa72dde7-1b4d-4d34-8dfd-b0c97a5cc0d7	Avulso	EP 314 Sul	[{"nome": "Requeijã Raspa", "valor": 45, "subtotal": 45, "quantidade": 1, "valorUnitario": 45}]	45.00	cliente avulso referência ep 314 Sul itens adquiridos um requeijão raspa r$ 45 forma de pagamento crédito	Venda convertida	f	2026-06-18 21:49:51.898527+00	2026-06-18 22:22:49.884+00	Crédito
fe07a0e9-82b1-4366-8ffe-9c2fa6f0b8e5	Valdério	Regional	[{"nome": "Lactose", "valor": 59, "subtotal": 59, "quantidade": 1, "valorUnitario": 59}, {"nome": "Doce Leite Zero Lactose", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}, {"nome": "Queijo Reino", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	163.00	Valério Secretaria 10 lactose R$59 um doce de leite zero lactose R$55 um queijo do reino R$49	Convertida	f	2026-06-15 14:13:14.880257+00	2026-06-16 00:14:10.371+00	Pix
690b88a7-b040-400c-952d-275d8e92743e	Iara	EC 405 Norte	[{"nome": "Palitos Zero Lactose", "valor": 118, "subtotal": 118, "quantidade": 2, "valorUnitario": 59}]	118.00	cliente Iara referência EC 405 Norte itens adquiridos dois palitos zero lactose 59 forma de pagamento fiado	Delivery programado	f	2026-06-18 21:48:30.254492+00	2026-06-18 22:24:45.855+00	Fiado / Em aberto
04e77913-241b-454b-856f-cc21b6b26ff5	Maysh	EC 405 Norte	[{"nome": "Antepasto", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}, {"nome": "Mussarela Búfala", "valor": 59, "subtotal": 59, "quantidade": 1, "valorUnitario": 59}]	108.00	maiche referência 405 Norte itens adquiridos um antepasto 49 uma mussarela de búfala 59 forma de pagamento crédito	Venda convertida	f	2026-06-17 22:43:32.918433+00	2026-06-17 23:06:28.807+00	Crédito
7f990cf7-1edb-4b59-ad87-4acb129a5058	Odila	EC 405 Norte	[{"nome": "Rosquinha Nata", "valor": 40, "subtotal": 40, "quantidade": 1, "valorUnitario": 40}, {"nome": "Desidratado Tradicional", "valor": 35, "subtotal": 35, "quantidade": 1, "valorUnitario": 35}]	75.00	Odila referência 405 Norte itens adquiridos uma rosquinha de Nata r$ 40 um desidratado tradicional r$ 35 forma de pagamento crédito	Venda convertida	f	2026-06-17 22:42:06.358752+00	2026-06-17 23:06:49.168+00	Crédito
f71ab679-7743-40d1-b020-7f8dd79a0f40	Isabela	CEDLAN	[{"nome": "Adquirido Um Parmesã Tradicional", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}, {"nome": "Palito Tradicional", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}, {"nome": "Dês Goi", "valor": 40, "subtotal": 40, "quantidade": 1, "valorUnitario": 40}, {"nome": "Van Ita Peq", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}, {"nome": "Lombinho Def", "valor": 50, "subtotal": 50, "quantidade": 1, "valorUnitario": 50}]	249.00	Isabela itens adquirido um parmesão tradicional R$59 um palito tradicional R$49 forma de pagamento fiado	Venda convertida	f	2026-06-16 14:28:32.377353+00	2026-06-16 20:47:49.265+00	Fiado / Em aberto
67413812-cb6b-47e8-838e-12173e45f342	Fabiana	EC 405 Norte	[{"nome": "Goiabada Cascão", "valor": 45, "subtotal": 45, "quantidade": 1, "valorUnitario": 45}]	45.00	Fabiana referência 405 norte itens adquiridos uma goiabada cascão R$40 forma de pagamento Pix	Venda convertida	f	2026-06-17 22:38:51.868475+00	2026-06-17 23:08:19.707+00	Pix
345fa232-db90-4385-93fe-3ba21e8e782e	Katiane	Paulo Freire	[{"nome": "Cocada Cremosa Tradicional", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	49.00	Cliente Katiane referência Paulo Freire itens adquiridos uma cocada cremosa tradicional R$49 forma de pagamento fiado	Delivery programado	f	2026-06-19 18:47:35.336056+00	2026-06-19 18:50:04.151+00	Fiado / Em aberto
04ca3d7c-5199-40d7-a72d-4702ab35b713	Sandra	CEDLAN	[{"nome": "Mostarda Com Maracujá", "valor": 45, "subtotal": 45, "quantidade": 1, "valorUnitario": 45}, {"nome": "Desidratado Goiabada", "valor": 40, "subtotal": 40, "quantidade": 1, "valorUnitario": 40}, {"nome": "Kit Mínimo Mostarda", "valor": 60, "subtotal": 60, "quantidade": 1, "valorUnitario": 60}]	145.00	Cliente Sandra itens adquiridos uma mostarda com maracujá R$45 um desidratado de goiabada R$40 um kit mínimo mostarda R$60 forma de pagamento Pix	Venda convertida	f	2026-06-16 13:56:20.287964+00	2026-06-16 20:53:16.973+00	Pix
dbc3d4bc-258b-479e-935a-1c6525c6ecab	Viviane	CEDLAN	[{"nome": "Rosquinha Nata", "valor": 40, "subtotal": 40, "quantidade": 1, "valorUnitario": 40}]	40.00	Viviane itens adquiridos uma rosquinha de nata R$40 forma de pagamento Pix	Venda convertida	f	2026-06-16 14:32:30.278702+00	2026-06-16 20:45:46.656+00	Pix
67ce1c3e-054f-4c07-89f9-1fb3f52af601	Flávia	CEDLAN	[{"nome": "Rosquinha Nata", "valor": 40, "subtotal": 40, "quantidade": 1, "valorUnitario": 40}]	40.00	Cliente Flávia referências CDA itens adquiridos uma rosquinha de nata R$40 Pix	Venda convertida	f	2026-06-16 13:38:22.778029+00	2026-06-16 20:54:07.359+00	Pix
39a5182f-c2af-4768-b37d-a046f277a4a3	José	CEDLAN	[{"nome": "Parmesã Tradicional", "valor": 100, "subtotal": 100, "quantidade": 2, "valorUnitario": 50}]	100.00	Cliente José itens adquiridos dois parmesão tradicional R$50	Venda convertida	f	2026-06-16 12:52:57.745177+00	2026-06-16 20:55:44.181+00	Débito
f6df0aae-b6c6-4b6e-b963-4bec75796ec0	Carol	EP 314 Sul	[{"nome": "Mel Pote", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}]	55.00	cliente Carol referência ep 314 Sul itens adquiridos um mel pote r$ 55 forma de pagamento pics	Venda convertida	f	2026-06-18 21:51:02.844487+00	2026-06-18 22:22:07.407+00	Pix
615292e4-72b6-4afa-ad30-f39ed2fc9b26	Henrique	CEDLAN	[{"nome": "Antepasto", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	49.00	Cliente Henrique itens adquiridos um kit lombinho três em um R$49 forma de pagamento delivery	Venda convertida	f	2026-06-16 12:51:04.336242+00	2026-06-16 20:56:42.32+00	Pix
1bf66a94-7603-4167-b17b-f671259cd493	Sueni	CEDLAN	[{"nome": "Provolone Desidratado", "valor": 40, "subtotal": 40, "quantidade": 1, "valorUnitario": 40}, {"nome": "Requeijã Tradicional", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}, {"nome": "Provolone Com Picanha", "valor": 63, "subtotal": 63, "quantidade": 1, "valorUnitario": 63}, {"nome": "Uma Geleia Jabuticaba", "valor": 45, "subtotal": 45, "quantidade": 1, "valorUnitario": 45}]	197.00	Cliente Sueny itens adquiridos um Provolone desidratado R$40 um requeijão tradicional R$49 um Provolone com picanha R$63 e uma geleia de jabuticaba R$45	Venda convertida	f	2026-06-16 12:35:46.489197+00	2026-06-16 20:57:38.919+00	Crédito
8a83f401-db0d-4178-bc2e-5732e3ef74db	Rosângela	EC 405 Norte	[{"nome": "Rosquinha Nata", "valor": 40, "subtotal": 40, "quantidade": 1, "valorUnitario": 40}, {"nome": "Tranç Cascavel", "valor": 50, "subtotal": 50, "quantidade": 1, "valorUnitario": 50}, {"nome": "Mussarela Palito", "valor": 50, "subtotal": 50, "quantidade": 1, "valorUnitario": 50}, {"nome": "Kit Parmesã", "valor": 79, "subtotal": 79, "quantidade": 1, "valorUnitario": 79}]	219.00	Rosângela referência 405 norte itens adquiridos uma rosquinha de nata R$40 uma trança Cascavel R$49 uma mussarela palito R$49 um kit parmesão R$79 forma de pagamento crédito	Venda convertida	f	2026-06-17 22:40:58.600943+00	2026-06-17 23:07:11.148+00	Crédito
1610271f-a27b-4607-b624-a19800b9f59b	Ruth	EC 405 Norte	[{"nome": "Tropical Pedaço Tradicional", "valor": 38, "subtotal": 38, "quantidade": 1, "valorUnitario": 38}]	38.00	Rute referência 405 Norte itens adquiridos um tropical pedaço tradicional r$ 35 forma de pagamento fiado	Delivery programado	f	2026-06-17 22:50:50.711097+00	2026-06-17 22:59:55.762+00	Fiado / Em aberto
a990d096-ebdb-4f2b-8ec5-2bae41bf162b	Hermínia	205 Norte	[{"nome": "Goiabada Cascã", "valor": 45, "subtotal": 45, "quantidade": 1, "valorUnitario": 45}, {"nome": "Minas Padrão Zero Lactose", "valor": 59, "subtotal": 59, "quantidade": 1, "valorUnitario": 59}, {"nome": "Figo", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}, {"nome": "Doce Leite Zero Lactose", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}]	208.00	Hermínia itens adquiridos Uma goiabada cascão r$ 45 um zero lactose 59 um figo r$ 49 um doce de leite zero r$ 55 forma de pagamento crédito	Venda convertida	f	2026-06-17 22:52:19.13413+00	2026-06-17 23:02:11.93+00	Crédito
d855381e-bdac-434e-be31-7b2a15438f00	Renato	EP 314 Sul	[{"nome": "Mel Pote", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}, {"nome": "Paçoca", "valor": 37, "subtotal": 37, "quantidade": 1, "valorUnitario": 37}]	92.00	cliente Renato referência ep 314 Sul itens adquiridos um mel pote 55 uma paçoca 37 forma de pagamento fixo	Venda convertida	f	2026-06-18 21:50:23.145304+00	2026-06-18 22:22:21.174+00	Pix
2269f8fd-a487-4b6c-b567-0c5565095380	Arthur	EP 314 Sul	[{"nome": "Requeijã Raspa", "valor": 45, "subtotal": 45, "quantidade": 1, "valorUnitario": 45}]	45.00	cliente Arthur referência ep 314 Sul itens adquiridos um requeijão raspa r$ 45 forma de pagamento fixo	Venda convertida	f	2026-06-18 21:53:32.665677+00	2026-06-18 22:16:53.489+00	Pix
54c01a7f-37c9-4a94-a360-c28c5b851f7f	Grazi	EP 314 Sul	[{"nome": "Desidratado Com Goiaba", "valor": 40, "subtotal": 40, "quantidade": 1, "valorUnitario": 40}]	40.00	cliente Grazi referência ep 314 Sul itens adquiridos um desidratado com goiaba r$ 40 forma de pagamento fiado	Delivery programado	f	2026-06-18 21:55:10.179072+00	2026-06-18 22:01:26.251+00	Fiado / Em aberto
6f0d8212-341b-4be4-8c31-459d02859e73	Silvio	EP 314 Sul	[{"nome": "Grana Padano", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}, {"nome": "Figo Rami", "valor": 65, "subtotal": 65, "quantidade": 1, "valorUnitario": 65}]	114.00	cliente Silvio referência ep 314 Sul itens adquiridos um grana padano 49 um figo Rami 65 forma de pagamento fiado	Venda convertida	f	2026-06-18 21:26:20.111782+00	2026-06-18 22:12:12.645+00	Fiado / Em aberto
0201b639-af73-4494-8a8e-09717cb20326	Kayse	EP 314 Sul	[{"nome": "Provolone", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}, {"nome": "Kit Parmesã", "valor": 69, "subtotal": 69, "quantidade": 1, "valorUnitario": 69}]	124.00	cliente Case referência ep 314 Sul itens adquiridos um provolone r$ 55 um kit parmesão r$ 69 forma de pagamento fiado	Venda convertida	f	2026-06-18 21:47:11.429155+00	2026-06-18 22:13:55.627+00	Fiado / Em aberto
9225b9cf-f3e3-4775-a267-124bffa55c62	Virna	EP 314 Sul	[{"nome": "Kit Mix", "valor": 50, "subtotal": 50, "quantidade": 1, "valorUnitario": 50}]	50.00	cliente Virna referência ep 314 Sul itens adquiridos um kit Mix r$ 50 forma de pagamento pics	Venda convertida	f	2026-06-18 21:54:36.605977+00	2026-06-18 22:16:19.419+00	Pix
aa388347-a532-4d9b-a0ca-5723681171dc	Arthur	EP 314 Sul	[{"nome": "Doce Leite Souvenir", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	49.00	cliente Arthur referência ep 314 Sul itens adquiridos um doce de leite Souvenir 49 forma de pagamento fiado	Venda convertida	f	2026-06-18 21:54:06.478412+00	2026-06-18 22:18:16.161+00	Fiado / Em aberto
62889c7b-0915-4798-8597-011ce87a8bb9	Joana	EP 314 Sul	[{"nome": "Trança", "valor": 55, "subtotal": 55, "quantidade": 1, "valorUnitario": 55}]	55.00	cliente Joana referência ep 314 Sul itens adquiridos uma trança r$ 55 forma de pagamento fiado	Venda convertida	f	2026-06-18 21:52:53.185767+00	2026-06-18 22:19:51.971+00	Fiado / Em aberto
90c3d2ad-8eb1-445b-ae0c-8e18d1dbfbfb	Jade	EP 314 Sul	[{"nome": "Doce Leite Souvenir", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	49.00	cliente Jade referência ep 314 Sul itens adquiridos um doce de leite Souvenir 49 forma de pagamento crédito	Venda convertida	f	2026-06-18 21:52:18.863755+00	2026-06-18 22:20:42.737+00	Crédito
53022ca1-ce95-418c-a51c-d01ac350563a	Aline	EP 314 Sul	[{"nome": "Rosquinha Nata", "valor": 45, "subtotal": 45, "quantidade": 1, "valorUnitario": 45}, {"nome": "Trança", "valor": 49, "subtotal": 49, "quantidade": 1, "valorUnitario": 49}]	94.00	cliente Aline referência ep 314 Sul itens adquiridos uma rosquinha de nata r$ 45 uma trança r$ 49 forma de pagamento fiado	Venda convertida	f	2026-06-18 21:51:38.393405+00	2026-06-18 22:21:52.152+00	Fiado / Em aberto
\.


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.produtos (id, nome, fornecedor, preco_custo, preco_venda, estoque, ativo, created_at, fornecedor_id, preco_custo_anterior) FROM stdin;
d402b9dc-5085-4899-9b3e-bb7d04ca7a72	Doce de Leite Zero Aç. Zero Lactose	\N	27.26	50.00	1000	t	2026-05-12 03:10:32.596887	7	\N
4338276c-f346-4802-8341-51112846bce7	Kitão c/ Palito Buba Canastra	\N	41.23	75.00	1000	t	2026-05-11 12:13:39.349568	8	\N
d9168dbf-8847-42aa-8339-3fb00d6d1708	Meia Cura  Zero Lactoze - Abelha	\N	36.80	58.00	1000	t	2026-05-13 01:27:21.944662	5	\N
b2b3aedd-b78c-4e74-bea2-a76c94462fb0	Kit Pimenta c/ 5 und.	\N	28.86	55.00	1000	t	2026-05-13 01:15:50.66572	6	\N
3d9db912-16cc-42ad-b187-93c109f4920a	Doce de Leite Diet Zero Lactose Fazenda de Minas	\N	28.00	50.00	1000	t	2026-05-10 19:59:09.934149	6	\N
8d04bbf2-bedd-471c-9fd4-7558e00dc514	Doce de Leite Vimilk 800g	\N	22.35	49.00	1000	t	2026-05-10 20:02:57.12344	5	\N
150398ab-f4ab-4de2-91bc-6d51d13c8048	kit 3 em 1 Prado E Braga	\N	21.00	49.00	1000	t	2026-05-10 23:01:15.669921	6	\N
65c8da1f-3970-46b3-887b-cf6308c80ea6	Reino Bola	\N	24.67	49.00	1000	t	2026-05-10 23:03:07.885912	8	\N
0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	Minas Frescal R.	\N	30.00	49.00	1000	t	2026-05-10 19:55:36.969939	11	\N
20afc8d4-63b6-4cfe-b9c8-4988eda32993	Coalho Dourado 500g	\N	24.00	49.00	1000	t	2026-05-11 00:20:12.638479	5	\N
736cd6eb-e985-4f43-8c1d-efd17fde7d78	Lombo Nobre Prado e Braga	\N	24.00	49.00	1000	t	2026-05-11 00:21:42.892627	5	\N
1f300abf-904d-4b4e-ad3e-b354d0e37310	Goiabada Cremosa Tia Carla 	\N	17.65	40.00	1000	t	2026-05-11 00:18:20.222189	6	\N
07beeda9-9a02-4aea-bb58-703cbc0bfc2e	Goiabada Cascão Tropical 1Kg	\N	9.99	40.00	1000	t	2026-05-11 00:24:07.523022	5	\N
ce5eb1c3-05b4-446c-bd6d-2ecfee916391	Mostarda c/ Maracujá	\N	19.40	45.00	1000	t	2026-05-11 02:20:11.687026	7	\N
13194c47-554b-47d8-9364-1a4e5eacf24b	Mostarda c/ Jabuticaba	\N	20.70	45.00	1000	t	2026-05-11 02:20:45.048889	\N	\N
91e47043-a834-49e0-9a32-c816b23bda36	Figo Ramy	\N	33.85	65.00	1000	t	2026-05-11 02:21:53.015584	5	\N
3fb2bcc6-66a1-48f7-9f44-4303bcbd42c8	Cachaça Vale da Canastra Pink	\N	76.81	190.00	1000	t	2026-05-11 02:28:44.997471	6	\N
ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	Provolone Tradicional Defumado	\N	24.05	49.00	1000	t	2026-05-11 12:02:52.332136	6	\N
81638b1e-a893-40d6-a39d-3c4069c6902e	Meia cura Dourado Metade	\N	24.05	49.00	1000	t	2026-05-11 12:03:47.524741	6	\N
432a5a7b-c6ca-4d6b-bcdb-1d1c40b5cb2a	Geleia Blueberry e Mel - Terra do Fogo	\N	15.72	39.00	1000	t	2026-05-13 01:19:34.848187	5	\N
8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	Minas Padrão Vila Caipira	\N	45.17	79.00	1000	t	2026-05-11 12:05:31.969923	5	\N
b7d0920b-f6b4-45f5-b232-ecf138c4cb1e	Meia Cura Canastra Metade	\N	20.27	49.00	1000	t	2026-05-11 12:06:26.907704	6	\N
beccb773-eb87-44ce-b0d8-7c8e1edea029	Requeijão Raspas Bom da Fazenda	\N	21.22	45.00	1000	t	2026-05-11 12:08:09.820434	6	\N
e5d51236-1d54-4aab-a945-67574c9eaadc	Requeijão Trad. Bom da Fazenda	\N	15.75	45.00	1000	t	2026-05-11 12:09:06.72756	6	\N
e4577355-89bd-4e1b-a152-a120c96b7062	Calambau com Cachaça	\N	15.56	45.00	1000	t	2026-05-11 12:10:09.579881	6	\N
163eed67-dfa7-47cb-bb26-72f6633f59cf	Copa Lombo Juliatto	\N	18.15	45.00	1000	t	2026-05-11 12:11:08.157609	5	\N
81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	Tunguinho	\N	22.00	45.00	1000	t	2026-05-11 12:15:23.341664	10	\N
9c0ecc03-bbc2-4723-bad8-b164194a6404	Trufado Damasco c/ Avelã	\N	32.00	65.00	1000	t	2026-05-20 20:32:29.130966	6	\N
00e43702-47b9-48b7-b792-a0b68c8b59c1	Taboa de Frios	\N	14.09	39.00	1000	t	2026-05-11 12:17:28.219895	8	\N
33e15f0e-3fba-49a0-8510-a3a51ce09330	Provolone Des. Goiabada	\N	18.30	40.00	1000	t	2026-05-11 02:23:46.092939	5	\N
e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	Rosquinha de Nata c/ Goiabada	\N	18.00	40.00	1000	t	2026-05-11 14:43:31.257777	9	\N
b5837a55-eb70-4f28-8745-1a52bb9c26dd	Lombo / Salame Vila Caipira	\N	15.00	35.00	1000	t	2026-05-15 23:57:00.629223	6	\N
cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	Minas Padrão Via Lat 	\N	37.77	75.00	1000	t	2026-05-16 21:02:05.139845	5	\N
aad92148-7c3e-4d29-a9ed-ddbfabf6f658	Doce de Leite Souvenir Tradicional  400g	\N	12.50	35.00	1000	t	2026-05-23 19:42:15.673826	5	\N
e83eb1a4-44c3-46aa-8bd7-0c2e39ac2b3b	Kit Parmesão Alagoa	\N	36.73	59.00	1000	t	2026-05-10 00:19:49.305892	6	\N
7d672959-251c-49e9-ab25-b236d9b1b2ec	Grana Padano Gramparma	\N	19.59	45.00	1000	t	2026-05-13 01:22:20.088905	5	\N
c14aabde-93dc-44a2-a114-dce69171b34a	Geleia Pimenta UAI 	\N	9.00	29.00	1000	t	2026-05-13 01:23:45.065731	5	\N
06137af0-4bd9-4eac-93da-7ccfd6195fdf	Mel Bisnaga 500g	\N	17.50	40.00	1000	t	2026-05-13 01:24:52.1768	5	\N
11a35476-3eba-411a-8b8f-3ccfd86bbe70	Cachaça Vale da Canastra  Rede	\N	27.00	65.00	1000	t	2026-05-17 11:25:01.614756	6	\N
55828daa-7fd3-4c7a-b704-faa7259ea0ce	Parmesão Divino´s	\N	30.83	60.00	1000	t	2026-05-13 01:30:33.886078	13	\N
661923c8-ea64-4fd8-9d57-65cb523dd4c4	Cachaça Vale da Canastra 2Lts	\N	28.30	90.00	1000	t	2026-05-20 20:09:16.247111	6	\N
9bc794ac-8e74-42e6-a559-c656bc3e732c	Trufado tradicional / Azeitona	\N	26.64	65.00	1000	t	2026-05-20 20:31:34.061602	6	\N
4ea61f2a-96e4-417a-a994-3ca4aca6863a	Mini Mostardas	\N	27.50	59.00	1000	t	2026-05-12 02:59:27.96273	7	\N
c9bd1e8e-7666-4002-ac41-16b2a1103d6a	Kit Parmesão Buba Canastra	\N	35.16	75.00	1000	t	2026-05-11 12:12:47.594947	8	40
7dee94ab-acfb-4afb-870f-f66f1de95b58	Meia Cura Domingos Metade	\N	21.45	50.00	1000	t	2026-05-13 01:01:49.190204	5	\N
f30b3e28-f290-4954-b818-0a608fa7c654	Minas Padrão Vila  Zero Lactose	\N	33.30	58.00	1000	t	2026-05-10 00:18:22.5528	5	\N
81652f9c-8e38-451c-8ac3-c2e490c1f24c	Trança	\N	25.02	49.00	1000	t	2026-05-11 12:12:06.092912	6	\N
10ea1108-3a24-4991-a32b-c5523ead4e83	Palito	\N	23.90	49.00	1000	t	2026-05-10 19:58:31.30491	6	\N
6ef878fc-08ae-4848-bd69-d65692254dc8	Provolone Des. Tradicional/ Sabores	\N	15.50	35.00	1000	t	2026-05-11 02:24:15.369528	5	\N
0487055c-6183-45da-a5ff-9c46c8ede331	Kit Mix 4 Queijos (Mix)	\N	27.05	55.00	1000	t	2026-05-11 02:27:40.445361	6	\N
64c86f31-7d91-45bb-8b62-13e7116699f8	Café Saga Canastra	\N	25.65	55.00	1000	t	2026-05-10 20:04:06.530706	5	\N
69546608-f7a8-48eb-95ef-ca13b0fc4949	Macarrão São Pedro Talharim	\N	9.99	20.00	1000	t	2026-05-17 23:02:54.359116	6	\N
729b030c-54f8-4cb7-b29e-9ab3a25cd26a	Kit Trança Buba Canastra	\N	45.47	75.00	1000	t	2026-05-11 12:14:22.634311	8	\N
34d9c074-bebe-4b26-b684-1a621789839a	Mussarela de Búfala	\N	32.00	55.00	1000	t	2026-05-13 01:10:11.232124	5	\N
0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	Mel Pote	\N	26.55	55.00	1000	t	2026-05-11 00:22:56.492969	5	\N
f5a3f732-314f-40f3-a75f-750560a2540b	Pão De Queijo Tradicional Minas Canastra Gourmet	\N	16.95	45.00	1000	t	2026-05-20 21:04:33.313889	6	\N
0f66560d-f5f4-448a-8f92-f38557369c58	Antepasto Berinjela	\N	23.31	49.00	1000	t	2026-05-11 02:22:44.346609	6	22.2
cb9e2ba7-958e-4889-b2bd-a2a5fb096790	Cachaça Vale da Canastra Ouro 275 ML	\N	13.41	39.00	1000	t	2026-05-22 22:21:51.240785	6	\N
cbb800c0-c5bf-4961-9025-6524a4d5488f	Doce de Leite Tropical (Pedaço)	\N	14.21	35.00	1000	t	2026-05-10 23:06:35.574157	5	12.99
5a8834c8-1b56-4055-8e3c-c219b88c4571	Morbier Pedaço Da Canastra	\N	23.92	49.00	1000	t	2026-05-23 00:35:55.970757	6	\N
8dc91077-0b13-42d7-9058-aade2d77d050	Vinagrete de Pimenta UAI TREM 330g	\N	15.80	38.00	1000	t	2026-05-23 19:30:31.617036	5	\N
0d8d1224-deff-44b1-bcb2-4e6577bd7617	Vinagrete de Jiló UAI TREM 330g	\N	15.80	38.00	1000	t	2026-05-23 19:33:34.416882	5	\N
127b5028-a4af-4315-b2c3-d3602918a0ba	Doce de Leite Souvinir Tradicional 800g	\N	18.50	45.00	1000	t	2026-05-10 20:05:53.841432	5	\N
369e5cbb-e9e9-489a-8e4e-3a0550be53a0	Provolone c/ Salame	\N	24.62	49.00	1000	t	2026-05-27 21:09:13.7713	6	\N
63b031d6-c373-423c-9f26-35422f608369	Doce de Leite Diet Fazenda de Minas 	\N	30.91	50.00	1000	t	2026-05-12 03:09:37.595774	7	24.05
d6abbcc3-1287-42b8-9410-b0c303c7bb12	Paçoca	\N	8.50	35.00	1000	t	2026-05-11 14:40:50.061675	5	12
62517356-0463-402d-bc31-940f9a522238	Provolone c/ Picanha	\N	31.10	63.00	1000	t	2026-05-11 12:01:21.242244	6	\N
81cd4fbc-60f3-4d2e-8257-04de4fac8034	Parmesão 	\N	19.64	45.00	1000	t	2026-05-27 21:51:46.093432	6	\N
13237c2d-dd72-4480-b274-670fa6fc511d	Salame Juliatto	\N	24.45	59.00	1000	t	2026-05-28 20:18:20.390225	7	\N
343c6429-bbdf-48cf-86d9-455509ef9b5b	Mel c/ Favo Imperador Vidro 500g	\N	40.25	60.00	1000	t	2026-05-29 22:49:22.774634	5	\N
bc10d03f-8910-418b-9344-c5a73ebf1e05	Geleia de Mocotó Trad Barra - 400g	\N	16.10	35.00	1000	t	2026-05-29 22:52:43.901057	5	\N
e8c778cf-73f2-4435-8456-2ba5b2dad405	Daniel | Provolone Des. Goiabada	\N	25.50	40.00	1000	t	2026-05-30 23:36:59.330134	16	\N
bbc46f88-e72d-4a49-a2e8-30e4786075f9	Kelcio | Mix Buba	\N	32.00	55.00	1000	t	2026-05-27 21:27:45.414305	17	\N
dc9fb3b6-9881-438a-beb5-5b01878ff0d0	Kelcio | Palito Zero Lactose	\N	30.00	59.00	1000	t	2026-05-27 21:26:35.851536	17	\N
f54074c2-1016-4e74-a381-4d0e19996e66	Kelcio | PEÇAS	\N	32.00	55.00	1000	t	2026-05-28 23:44:17.99088	17	\N
51ffc4d4-e18f-427a-9166-a5e75ec5c139	Daniel | Trufado Damasco c/ Avelã	\N	40.00	65.00	1000	t	2026-05-15 21:13:54.820554	16	\N
4d7e7597-1fbd-4c47-98d7-b1f039bf6d69	kelcio | Vila Caipira	\N	50.00	79.00	1000	t	2026-06-04 23:39:43.293205	17	\N
7e17d541-9f2e-4586-af64-dbb414c369d7	Kitão  s/ Palito |  Buba Canastra	\N	31.52	70.00	1000	t	2026-06-08 20:59:59.984621	8	\N
5d1cca77-abc8-48c5-8ed0-3acf0222f498	Kit Mix	\N	26.67	55.00	1000	t	2026-06-08 21:02:11.27356	8	\N
335cd853-18c8-48ac-807c-c94ca1a20ee7	Canastra Meia Cura Metade	\N	32.33	55.00	1000	t	2026-06-08 20:57:17.15735	8	\N
24da1a73-59fa-4b9d-9fd8-ca5715ae964b	Canastra Meia Cura Inteiro	\N	64.66	99.00	1000	t	2026-06-08 20:57:34.511939	8	\N
5d74fdb6-8507-4f0e-b202-7c064095de59	Goiabada Casção 1Kg | Estaçao Minas	\N	13.90	40.00	1000	t	2026-06-08 21:21:00.945185	5	\N
8822ada2-0b55-450b-a960-5c79cfbc9e52	Parmesão Cunha Vila Caipira	\N	37.44	60.00	1000	t	2026-06-09 22:12:06.731551	19	\N
f4f42db8-afea-458e-97b1-67a4026f6c6b	Requeijão c/ Raspas | Canastra Original	\N	25.87	49.00	1000	t	2026-06-08 20:54:48.264629	18	\N
680c1088-2264-46ed-b338-d0a71e3e8c7c	Requeijão Tradicional | Canastra Original	\N	25.87	49.00	1000	t	2026-06-08 20:55:32.041679	18	\N
c6081edc-0b34-43b7-91fb-6b97bc45c534	Bala Doce de Leite- Serra Negra	\N	19.50	39.00	1000	t	2026-06-11 20:00:18.114403	5	\N
fd98f68d-6e36-43c9-b918-248065a6425d	Salitre Meia Cura | Sr. Paulo	\N	50.00	99.00	1000	t	2026-06-14 00:41:08.522368	\N	\N
e06a31e8-ac5e-4b3d-8524-7f0da4869b72	Kelcio | Bufala	\N	33.00	55.00	1000	t	2026-06-16 21:03:45.942983	17	\N
f665acf3-069c-4ec3-9ac6-a1dca6009783	Kelcio | Minas Padrão Vila caipira	\N	56.50	79.00	1000	t	2026-06-16 21:04:30.571627	17	\N
40ba9005-5b3d-4db4-a0c7-ddc11b9b578b	Kelcio | Van Ita	\N	33.00	55.00	1000	t	2026-06-16 21:05:03.878009	17	\N
aba4027c-0b08-4926-8032-b50ea281345e	Kelcio | Cascavel	\N	33.00	55.00	1000	t	2026-06-16 21:05:24.465691	17	\N
50e7a3a2-ebd7-48f9-95ae-6f878fc5e166	Kelcio | Parmesão Divino	\N	37.33	60.00	1000	t	2026-06-16 21:05:59.57026	17	\N
128b1a35-a215-4fc0-b2f9-6e583b761b37	Kelcio | Kitão Sem Palito	\N	39.66	60.00	1000	t	2026-05-27 21:29:05.380933	17	\N
\.


--
-- Data for Name: produtos_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.produtos_backup_20260523 (id, nome, fornecedor, preco_custo, preco_venda, estoque, ativo, created_at, fornecedor_id, preco_custo_anterior) FROM stdin;
63b031d6-c373-423c-9f26-35422f608369	Doce de Leite Diet Fazenda de Minas 	\N	24.05	50.00	1000	t	2026-05-12 03:09:37.595774	7	\N
d402b9dc-5085-4899-9b3e-bb7d04ca7a72	Doce de Leite Zero Aç. Zero Lactose	\N	27.26	50.00	1000	t	2026-05-12 03:10:32.596887	7	\N
4338276c-f346-4802-8341-51112846bce7	Kitão c/ Palito Buba Canastra	\N	41.23	75.00	1000	t	2026-05-11 12:13:39.349568	8	\N
d9168dbf-8847-42aa-8339-3fb00d6d1708	Meia Cura  Zero Lactoze - Abelha	\N	36.80	58.00	1000	t	2026-05-13 01:27:21.944662	5	\N
b2b3aedd-b78c-4e74-bea2-a76c94462fb0	Kit Pimenta c/ 5 und.	\N	28.86	55.00	1000	t	2026-05-13 01:15:50.66572	6	\N
3d9db912-16cc-42ad-b187-93c109f4920a	Doce de Leite Diet Zero Lactose Fazenda de Minas	\N	28.00	50.00	1000	t	2026-05-10 19:59:09.934149	6	\N
8d04bbf2-bedd-471c-9fd4-7558e00dc514	Doce de Leite Vimilk 800g	\N	22.35	49.00	1000	t	2026-05-10 20:02:57.12344	5	\N
150398ab-f4ab-4de2-91bc-6d51d13c8048	kit 3 em 1 Prado E Braga	\N	21.00	49.00	1000	t	2026-05-10 23:01:15.669921	6	\N
65c8da1f-3970-46b3-887b-cf6308c80ea6	Reino Bola	\N	24.67	49.00	1000	t	2026-05-10 23:03:07.885912	8	\N
0c058eb1-dba3-47fa-99ea-c8f9095d1bcf	Minas Frescal R.	\N	30.00	49.00	1000	t	2026-05-10 19:55:36.969939	11	\N
20afc8d4-63b6-4cfe-b9c8-4988eda32993	Coalho Dourado 500g	\N	24.00	49.00	1000	t	2026-05-11 00:20:12.638479	5	\N
736cd6eb-e985-4f43-8c1d-efd17fde7d78	Lombo Nobre Prado e Braga	\N	24.00	49.00	1000	t	2026-05-11 00:21:42.892627	5	\N
1f300abf-904d-4b4e-ad3e-b354d0e37310	Goiabada Cremosa Tia Carla 	\N	17.65	40.00	1000	t	2026-05-11 00:18:20.222189	6	\N
07beeda9-9a02-4aea-bb58-703cbc0bfc2e	Goiabada Cascão Tropical 1Kg	\N	9.99	40.00	1000	t	2026-05-11 00:24:07.523022	5	\N
ce5eb1c3-05b4-446c-bd6d-2ecfee916391	Mostarda c/ Maracujá	\N	19.40	45.00	1000	t	2026-05-11 02:20:11.687026	7	\N
13194c47-554b-47d8-9364-1a4e5eacf24b	Mostarda c/ Jabuticaba	\N	20.70	45.00	1000	t	2026-05-11 02:20:45.048889	\N	\N
91e47043-a834-49e0-9a32-c816b23bda36	Figo Ramy	\N	33.85	65.00	1000	t	2026-05-11 02:21:53.015584	5	\N
3fb2bcc6-66a1-48f7-9f44-4303bcbd42c8	Cachaça Vale da Canastra Pink	\N	76.81	190.00	1000	t	2026-05-11 02:28:44.997471	6	\N
62517356-0463-402d-bc31-940f9a522238	Provolone c/ Picanha	\N	31.10	59.00	1000	t	2026-05-11 12:01:21.242244	6	\N
ba0d5f0e-876b-4961-a4d3-b4b25d11fcfb	Provolone Tradicional Defumado	\N	24.05	49.00	1000	t	2026-05-11 12:02:52.332136	6	\N
81638b1e-a893-40d6-a39d-3c4069c6902e	Meia cura Dourado Metade	\N	24.05	49.00	1000	t	2026-05-11 12:03:47.524741	6	\N
432a5a7b-c6ca-4d6b-bcdb-1d1c40b5cb2a	Geleia Blueberry e Mel - Terra do Fogo	\N	15.72	39.00	1000	t	2026-05-13 01:19:34.848187	5	\N
8efc6d50-f92c-4a1a-9a27-9f4780b93ce2	Minas Padrão Vila Caipira	\N	45.17	79.00	1000	t	2026-05-11 12:05:31.969923	5	\N
b7d0920b-f6b4-45f5-b232-ecf138c4cb1e	Meia Cura Canastra Metade	\N	20.27	49.00	1000	t	2026-05-11 12:06:26.907704	6	\N
beccb773-eb87-44ce-b0d8-7c8e1edea029	Requeijão Raspas Bom da Fazenda	\N	21.22	45.00	1000	t	2026-05-11 12:08:09.820434	6	\N
e5d51236-1d54-4aab-a945-67574c9eaadc	Requeijão Trad. Bom da Fazenda	\N	15.75	45.00	1000	t	2026-05-11 12:09:06.72756	6	\N
e4577355-89bd-4e1b-a152-a120c96b7062	Calambau com Cachaça	\N	15.56	45.00	1000	t	2026-05-11 12:10:09.579881	6	\N
163eed67-dfa7-47cb-bb26-72f6633f59cf	Copa Lombo Juliatto	\N	18.15	45.00	1000	t	2026-05-11 12:11:08.157609	5	\N
c9bd1e8e-7666-4002-ac41-16b2a1103d6a	Kit Parmesão Buba Canastra	\N	40.00	75.00	1000	t	2026-05-11 12:12:47.594947	8	\N
81af7b1f-7b9b-44dd-b0e0-b6787cb41cc3	Tunguinho	\N	22.00	45.00	1000	t	2026-05-11 12:15:23.341664	10	\N
9c0ecc03-bbc2-4723-bad8-b164194a6404	Trufado Damasco c/ Avelã	\N	32.00	65.00	1000	t	2026-05-20 20:32:29.130966	6	\N
00e43702-47b9-48b7-b792-a0b68c8b59c1	Taboa de Frios	\N	14.09	39.00	1000	t	2026-05-11 12:17:28.219895	8	\N
33e15f0e-3fba-49a0-8510-a3a51ce09330	Provolone Des. Goiabada	\N	18.30	40.00	1000	t	2026-05-11 02:23:46.092939	5	\N
d6abbcc3-1287-42b8-9410-b0c303c7bb12	Paçoca	\N	12.00	35.00	1000	t	2026-05-11 14:40:50.061675	5	\N
e3dffbb0-8eae-4ae4-8e06-89fc25d7381c	Rosquinha de Nata c/ Goiabada	\N	18.00	40.00	1000	t	2026-05-11 14:43:31.257777	9	\N
b5837a55-eb70-4f28-8745-1a52bb9c26dd	Lombo / Salame Vila Caipira	\N	15.00	35.00	1000	t	2026-05-15 23:57:00.629223	6	\N
cb8f04fe-7ac9-419f-83fe-5f80ac0ded3b	Minas Padrão Via Lat 	\N	37.77	75.00	1000	t	2026-05-16 21:02:05.139845	5	\N
127b5028-a4af-4315-b2c3-d3602918a0ba	Doce de Leite Souvinir Tradicional	\N	18.50	45.00	1000	t	2026-05-10 20:05:53.841432	5	\N
e83eb1a4-44c3-46aa-8bd7-0c2e39ac2b3b	Kit Parmesão Alagoa	\N	36.73	59.00	1000	t	2026-05-10 00:19:49.305892	6	\N
7d672959-251c-49e9-ab25-b236d9b1b2ec	Grana Padano Gramparma	\N	19.59	45.00	1000	t	2026-05-13 01:22:20.088905	5	\N
c14aabde-93dc-44a2-a114-dce69171b34a	Geleia Pimenta UAI 	\N	9.00	29.00	1000	t	2026-05-13 01:23:45.065731	5	\N
06137af0-4bd9-4eac-93da-7ccfd6195fdf	Mel Bisnaga 500g	\N	17.50	40.00	1000	t	2026-05-13 01:24:52.1768	5	\N
11a35476-3eba-411a-8b8f-3ccfd86bbe70	Cachaça Vale da Canastra  Rede	\N	27.00	65.00	1000	t	2026-05-17 11:25:01.614756	6	\N
55828daa-7fd3-4c7a-b704-faa7259ea0ce	Parmesão Divino´s	\N	30.83	60.00	1000	t	2026-05-13 01:30:33.886078	13	\N
661923c8-ea64-4fd8-9d57-65cb523dd4c4	Cachaça Vale da Canastra 2Lts	\N	28.30	90.00	1000	t	2026-05-20 20:09:16.247111	6	\N
9bc794ac-8e74-42e6-a559-c656bc3e732c	Trufado tradicional / Azeitona	\N	26.64	65.00	1000	t	2026-05-20 20:31:34.061602	6	\N
4ea61f2a-96e4-417a-a994-3ca4aca6863a	Mini Mostardas	\N	27.50	59.00	1000	t	2026-05-12 02:59:27.96273	7	\N
729b030c-54f8-4cb7-b29e-9ab3a25cd26a	Kit Trança Buba Canastra	\N	44.87	75.00	1000	t	2026-05-11 12:14:22.634311	8	\N
7dee94ab-acfb-4afb-870f-f66f1de95b58	Meia Cura Domingos Metade	\N	21.45	50.00	1000	t	2026-05-13 01:01:49.190204	5	\N
f30b3e28-f290-4954-b818-0a608fa7c654	Minas Padrão Vila  Zero Lactose	\N	33.30	58.00	1000	t	2026-05-10 00:18:22.5528	5	\N
81652f9c-8e38-451c-8ac3-c2e490c1f24c	Trança	\N	25.02	49.00	1000	t	2026-05-11 12:12:06.092912	6	\N
10ea1108-3a24-4991-a32b-c5523ead4e83	Palito	\N	23.90	49.00	1000	t	2026-05-10 19:58:31.30491	6	\N
6ef878fc-08ae-4848-bd69-d65692254dc8	Provolone Des. Tradicional/ Sabores	\N	15.50	35.00	1000	t	2026-05-11 02:24:15.369528	5	\N
0487055c-6183-45da-a5ff-9c46c8ede331	Kit Mix 4 Queijos (Mix)	\N	27.05	55.00	1000	t	2026-05-11 02:27:40.445361	6	\N
64c86f31-7d91-45bb-8b62-13e7116699f8	Café Saga Canastra	\N	25.65	55.00	1000	t	2026-05-10 20:04:06.530706	5	\N
69546608-f7a8-48eb-95ef-ca13b0fc4949	Macarrão São Pedro Talharim	\N	9.99	20.00	1000	t	2026-05-17 23:02:54.359116	6	\N
51ffc4d4-e18f-427a-9166-a5e75ec5c139	Trufado Damasco c/ Avelã	\N	40.00	65.00	1000	t	2026-05-15 21:13:54.820554	16	\N
34d9c074-bebe-4b26-b684-1a621789839a	Mussarela de Búfala	\N	32.00	55.00	1000	t	2026-05-13 01:10:11.232124	5	\N
0fc1da8f-435f-423a-93a3-5e5bbcaa4be7	Mel Pote	\N	26.55	55.00	1000	t	2026-05-11 00:22:56.492969	5	\N
f5a3f732-314f-40f3-a75f-750560a2540b	Pão De Queijo Tradicional Minas Canastra Gourmet	\N	16.95	45.00	1000	t	2026-05-20 21:04:33.313889	6	\N
0f66560d-f5f4-448a-8f92-f38557369c58	Antepasto Berinjela	\N	23.31	49.00	1000	t	2026-05-11 02:22:44.346609	6	22.2
cb9e2ba7-958e-4889-b2bd-a2a5fb096790	Cachaça Vale da Canastra Ouro 275 ML	\N	13.41	39.00	1000	t	2026-05-22 22:21:51.240785	6	\N
cbb800c0-c5bf-4961-9025-6524a4d5488f	Doce de Leite Tropical (Pedaço)	\N	14.21	35.00	1000	t	2026-05-10 23:06:35.574157	5	12.99
5a8834c8-1b56-4055-8e3c-c219b88c4571	Morbier Pedaço Da Canastra	\N	23.92	49.00	1000	t	2026-05-23 00:35:55.970757	6	\N
\.


--
-- Data for Name: roteiro_vendas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roteiro_vendas (id, local, tipo, ultima_visita, pecas_vendidas, observacao, created_at, data_visita) FROM stdin;
6e58f4b9-b83f-425f-9491-c91c7c054ea2	Teste	Escola	\N	10	\N	2026-05-20 23:33:23.126521+00	2026-05-20
\.


--
-- Data for Name: roteiro_vendas_v2; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roteiro_vendas_v2 (id, local, tipo, data_visita, pecas_vendidas, observacao, created_at, categoria, referencia, horario, concluido, ativo, updated_at) FROM stdin;
c7e880fe-522a-4c84-a6be-9ce447e268a3	Paulo Freire	Local	2026-06-13	0		2026-05-21 00:19:13.343586+00	LOCAL		8:45  | 10:30	t	t	2026-06-14 00:11:00.511+00
6b6d8a9b-8ffa-44b1-8a6e-2cce4c32bacc	Gan	Local	2026-05-29	0		2026-05-21 00:39:53.355774+00	LOCAL		9:40	f	t	2026-06-08 21:24:13.778+00
2777cd74-eda6-49e4-aec9-30f4476ad25e	EP 210 Norte	Local	2026-06-15	0		2026-05-21 00:18:28.629088+00	LOCAL		9:40	t	t	2026-06-15 11:51:29.054+00
22d4658e-102f-4948-9b1a-bbc0c9da03b4	Renata	Cliente	2026-05-27	0		2026-05-27 02:03:40.756531+00	CLIENTE	DCA		f	t	2026-05-27 02:03:37.531+00
64b9dd94-11b6-4a09-beef-5aaaa94ce091	Thelma	Cliente	2026-05-27	0		2026-05-27 02:04:01.651929+00	CLIENTE	APAE		f	t	2026-05-27 02:03:58.903+00
39b43856-dec3-482e-9924-30989477a32a	Gabi	Cliente	2026-05-27	0	Amiga da Kênia 405	2026-05-27 02:04:45.755609+00	CLIENTE			f	t	2026-05-27 02:04:42.386+00
9618b5b0-5f7e-4f89-af06-4a77c4885fc0	DP Sobradinho II	Local	2026-05-27	0		2026-05-27 02:10:29.024313+00	LOCAL			f	t	2026-05-27 02:10:25.788+00
6fbe66bf-ccf3-40cd-a38e-9b4c554bf84e	Guilherme	Cliente	2026-05-27	0		2026-05-27 02:10:52.45168+00	CLIENTE	àguas Claras		f	t	2026-05-27 02:10:49.439+00
6e4e0b45-0b36-4a13-a8bf-efe1d3e0e837	Lara	Cliente	2026-05-27	0		2026-05-27 11:00:54.363862+00	CLIENTE	Meninos e Meninas do Parque		f	t	2026-05-27 11:00:52.904+00
6d4a455b-19fd-46df-8482-12a00da7e29c	306 Norte	Local	2026-05-19	0		2026-05-21 00:20:52.31125+00	LOCAL		9:30	f	t	2026-06-08 21:37:40.657+00
4c428730-1d07-477d-9705-4516e655c4a7	Setor Oeste	Local	2026-05-25	0		2026-05-21 00:21:14.017432+00	LOCAL		9h  | 10:45	f	t	2026-06-08 21:38:12.944+00
83586a86-949e-4a55-b314-54b3f2193b24	114 Sul	Local	2026-06-03	0		2026-05-21 00:37:57.623569+00	LOCAL		10h	f	t	2026-06-08 21:39:44.387+00
f5a2555e-8d13-4134-a6ed-4f334282bcdd	CEDLAN	Local	2026-06-16	0	Melhores dias: Terças, Quartas e Sextas-feiras	2026-05-21 00:02:15.384024+00	LOCAL		9:30 e 11H	t	t	2026-06-16 13:02:27.782+00
97ca8f41-0083-4ac3-93b4-20b828f273b5	405 Norte	Local	2026-06-17	0		2026-05-21 00:20:27.249343+00	LOCAL		10:20	t	t	2026-06-17 22:35:01.698+00
a9f319e7-2ebb-480a-abe6-5bd6ef4a5a84	EC 113 Norte	Local	2026-06-01	0		2026-06-08 21:26:49.258283+00	LOCAL		10h	f	t	2026-06-08 21:26:48.406+00
3015a78a-999d-4844-ae40-1039a4c69e04	Parque 210 Sul	Local	2026-06-02	0		2026-05-29 20:08:57.968568+00	LOCAL		9:45	f	t	2026-06-08 21:27:25.132+00
1d9ec224-634e-491a-a370-365508bbaeb7	EP 304 Norte	Local	2026-05-26	0		2026-05-21 00:36:40.791966+00	LOCAL		9:45	f	t	2026-06-08 21:28:46.063+00
1bb4525a-1468-4b89-a862-e698868de7b8	Claudia	Cliente	2026-06-17	0		2026-05-27 01:47:34.325802+00	CLIENTE	 Lago Norte		t	t	2026-06-17 22:36:16.183+00
d75c2768-1cf4-4d72-a08b-251120635a62	304 Norte	Local	2026-06-05	0		2026-05-21 00:17:25.719941+00	LOCAL		9:40	f	t	2026-06-08 21:32:05.352+00
cd403a93-9b76-499b-8101-fca86638991a	DCA	Delegacia	2026-06-08	8		2026-05-21 00:17:42.216168+00	LOCAL	\N	\N	t	t	2026-06-08 21:32:23.791+00
d0f27257-af30-483b-89ee-f5258218f68a	Kika	Cliente	2026-06-17	0		2026-05-27 01:59:11.188392+00	CLIENTE			t	t	2026-06-17 22:36:26.902+00
badb3606-37d4-45d6-8052-21886f02b29b	Graça Baldez	Cliente	2026-05-27	0	Mãe da Renata - DCA	2026-05-27 01:21:31.517609+00	CLIENTE			f	t	2026-05-27 01:21:27.945+00
a56041ab-9d08-4cd0-8bd8-172e646d0525	Valdério	Cliente	2026-06-17	0	Exceto as quartas-feiras	2026-05-27 01:23:20.226241+00	CLIENTE	Regional de Ensino		t	t	2026-06-17 22:36:33.785+00
96e69c69-09e3-442d-8da4-f686d1b653a6	Adriana	Cliente	2026-06-17	0	Exceto as quartas-feiras	2026-05-27 01:24:09.354252+00	CLIENTE	Regional de Ensino		t	t	2026-06-17 22:36:42.883+00
648a38f0-1d14-4f31-91b1-04696265b476	Fernanda	Cliente	2026-05-27	0		2026-05-27 01:57:34.152563+00	CLIENTE	403 Norte		f	t	2026-06-08 21:34:02.851+00
9b42fbbc-3947-4be8-9298-329aa5929448	Franco	Cliente	2026-05-27	0		2026-05-27 01:58:57.350421+00	CLIENTE	Polivalente		f	t	2026-06-08 21:34:04.142+00
0e52d927-d725-4880-b6e1-9da64b44e463	Edelson	Cliente	2026-05-27	0		2026-05-27 01:44:34.827158+00	CLIENTE			f	t	2026-05-27 01:44:32.121+00
f059c84e-ddca-4881-b8ed-d29d08c6f7d1	Jane	Cliente	2026-05-27	0		2026-05-27 01:52:00.854208+00	CLIENTE	EC 114 Sul		f	t	2026-06-08 21:34:07.13+00
4beddb1e-48b4-4b91-92d5-14f2a67f4758	EP 314 Sul	Local	2026-06-18	0		2026-05-21 00:19:39.015039+00	LOCAL		9:20  | 10h	t	t	2026-06-18 23:56:47.049+00
0b3a738f-c6d1-403f-8e4a-abebabceac55	André irmão da Adriana	Cliente	2026-05-27	0		2026-05-27 01:47:10.277122+00	CLIENTE			f	t	2026-05-27 01:47:07.272+00
9d63ee0d-9539-4675-a50e-75730ca5ef66	Carla Pipoca	Cliente	2026-05-27	0		2026-05-27 01:47:56.20769+00	CLIENTE	104 Norte		f	t	2026-05-27 01:47:53.51+00
8a1ef13a-ad70-44b2-92f9-c3f77e5cea0a	Danielle	Cliente	2026-05-27	0		2026-05-27 01:59:29.719828+00	CLIENTE	SESC		f	t	2026-05-27 01:59:26.825+00
55d0b7b9-0f85-4b4e-bfeb-19aea6d85fc4	CEAN	Local	2026-06-09	0		2026-05-21 00:18:10.808042+00	LOCAL		9h  | 10:45	t	t	2026-06-09 22:16:58.68+00
3f644a24-115b-4beb-bc63-7baf5e3ebf55	Goretti	Cliente	2026-05-27	0		2026-05-27 23:36:25.410538+00	CLIENTE	703 Norte | Bloco L | Apto 		f	t	2026-05-27 23:36:24.14+00
7ca3b1f8-dcaa-40c9-8c6e-4e220678ed89	Vanessa Lima	Cliente	2026-05-27	0		2026-05-27 09:54:06.604023+00	CLIENTE	Asa sul		f	t	2026-06-09 22:20:15.059+00
d8d8d1b3-5368-4a29-be0d-c6d3ab200f31	Tatiana	Cliente	2026-05-29	0	2026 está no Nucleo Bandeirantes	2026-05-29 20:44:42.624721+00	CLIENTE	GAN		f	t	2026-05-29 20:44:41.196+00
642cae02-3fc3-4bac-85da-ea37e0477016	CORF	Delegacia	2026-06-11	17		2026-05-21 00:18:50.458899+00	LOCAL	\N	\N	t	t	2026-06-11 15:34:00.002+00
57a8c3ce-0c23-435b-a3fc-5a244cc4f5b3	Olavo	Cliente	2026-05-27	0		2026-05-27 01:52:57.711363+00	CLIENTE	Polivalente		f	t	2026-06-08 21:34:07.89+00
68f24af7-d0ec-4fdf-97fa-2054d8e02adc	Valentin	Cliente	2026-05-27	0	Trança no Vinho	2026-05-27 01:44:08.860947+00	CLIENTE	Regional de Ensino		f	t	2026-06-08 21:34:12.299+00
a096c9ff-fe5a-4238-aa9d-b2b53f17a001	CHPP	Escola	2026-05-26	15		2026-05-21 00:41:29.168617+00	LOCAL	\N	\N	f	t	2026-06-08 21:24:06.278+00
3cd8b45b-b4c4-4a14-9b0f-7efa760c9d69	SEB Dínatos	Local	2026-06-12	0		2026-05-21 00:20:00.00164+00	LOCAL		9:20  | 9:50	t	t	2026-06-14 00:10:28.238+00
df1d44cb-3907-40b2-8b53-4b088fdfb587	Objetivo	Local	2026-05-28	0		2026-05-21 00:39:16.651789+00	LOCAL		9h e 10h	f	t	2026-06-08 21:24:11.519+00
\.


--
-- Data for Name: taxas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.taxas (id, forma_pagamento, taxa_percentual, created_at) FROM stdin;
03f85d38-3d9a-4704-a381-7964ab582358	Pix	0.00	2026-05-10 01:08:10.54757
6788dc7f-3cf1-417f-bed5-48530de87080	Fiado | Em aberto	0.00	2026-05-10 14:48:46.135043
4e4ee301-e5ec-4367-93cc-19557e1ca597	Débito Master | Visa	0.84	2026-05-10 01:08:10.54757
69c8e4b4-73a5-4bc7-9f7d-a0548ad0e53c	Crédito Master | Visa	3.09	2026-05-10 01:08:10.54757
0be50180-6d7e-4b02-8d7a-8dea4b393779	Débito American | Cielo	2.03	2026-05-10 01:08:10.54757
a4e4c899-07a3-4aa3-b3c6-e8d34c4235b5	Link de pagamento	4.97	2026-05-10 01:08:17.638921
58b0b70a-26c9-4ad0-86bb-89714daadfd3	Crédito American | Elo	4.28	2026-05-10 01:08:10.54757
\.


--
-- Data for Name: taxas_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.taxas_backup_20260523 (id, forma_pagamento, taxa_percentual, created_at) FROM stdin;
03f85d38-3d9a-4704-a381-7964ab582358	Pix	0.00	2026-05-10 01:08:10.54757
a4e4c899-07a3-4aa3-b3c6-e8d34c4235b5	Link de pagamento	4.20	2026-05-10 01:08:17.638921
69c8e4b4-73a5-4bc7-9f7d-a0548ad0e53c	Crédito Master | Visa	3.15	2026-05-10 01:08:10.54757
0be50180-6d7e-4b02-8d7a-8dea4b393779	Débito American | Cielo	2.58	2026-05-10 01:08:10.54757
4e4ee301-e5ec-4367-93cc-19557e1ca597	Débito Master | Visa	1.37	2026-05-10 01:08:10.54757
6788dc7f-3cf1-417f-bed5-48530de87080	Fiado | Em aberto	0.00	2026-05-10 14:48:46.135043
58b0b70a-26c9-4ad0-86bb-89714daadfd3	Crédito American | Elo	4.50	2026-05-10 01:08:10.54757
\.


--
-- Data for Name: vendas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendas (id, numero_venda, cliente_id, data_venda, valor_total, valor_liquido, forma_pagamento, taxa_percentual, valor_taxa, status, created_at, cliente_nome_avulso) FROM stdin;
b81f4153-6d87-4cec-990d-1640330ad6e3	42	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	144.00	139.46	Crédito Master | Visa	3.15	4.54	PAGO	2026-05-16 02:07:19.356297	\N
9617c8e6-e71d-4a31-9983-0c4942ca37a3	51	94842280-2699-4eb6-a4d4-345b116c5e66	2026-05-13	276.00	276.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-16 20:48:06.912924	\N
255b4826-4f26-4891-b3e3-e486008bc611	1	b71e719b-c5bd-4a76-bedd-98447770029b	2026-05-04	340.00	340.00	Pix	0.00	0.00	PAGO	2026-05-15 21:16:37.283001	\N
17726950-2dad-41ad-a643-2bc5a249368c	2	03e36432-3280-440a-b0ce-53ee68f4166c	2026-05-04	179.00	173.36	Crédito Master | Visa	3.15	5.64	PAGO	2026-05-15 21:17:24.545717	\N
e586b75f-0f41-4998-a4b2-c2667765f1b5	57	9fd43f47-77b1-4352-b6d9-caca865c9b31	2026-05-13	79.00	79.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-16 20:51:31.57706	\N
1ff6afb1-5ef4-44ef-8c39-57e73f7b6be6	3	28e8e788-226f-439e-97d8-210c5c2bc097	2026-05-04	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-15 21:17:54.154898	\N
f2ecb566-3a57-40ea-8bf6-1a32745fee44	4	88de90f4-ed69-4d6a-8520-b49aaa847519	2026-05-04	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-15 21:18:17.274715	\N
29bdac83-7604-4b57-b979-74aa8a80333f	5	d7cc004f-5b0f-4dfd-8a21-e757565b9512	2026-05-04	35.00	35.00	Pix	0.00	0.00	PAGO	2026-05-15 21:18:42.61083	\N
22be0b61-a8c9-4e27-8aea-ca96bb00ab82	6	8cd05d23-127e-4c3d-bdde-2986c9d95744	2026-05-04	98.00	93.88	Link de pagamento	4.20	4.12	PAGO	2026-05-15 21:19:14.896534	\N
0a650d3a-8954-49e9-a234-2f5c03b2f2e9	7	42963653-1462-485d-a1a5-ca8832afac72	2026-05-05	98.00	98.00	Pix	0.00	0.00	PAGO	2026-05-15 23:28:38.996253	\N
4ce062e3-07d5-4a1e-9111-b83ce8b602c9	8	42963653-1462-485d-a1a5-ca8832afac72	2026-05-05	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-15 23:28:54.694234	\N
208532fe-ec39-40e8-93ab-3ccede046656	9	e21a833b-820f-43f0-b050-770259dbefb8	2026-05-05	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-15 23:29:10.466606	\N
357cb992-7173-4a66-847b-3259299993b0	10	6984057f-a825-4a88-a44c-f4544fb93477	2026-05-05	84.00	84.00	Pix	0.00	0.00	PAGO	2026-05-15 23:29:29.870529	\N
243fecf8-bc09-4d83-9d7e-92bacfc85d40	11	83bc3540-fab3-46e1-99aa-aea3c7d7aa76	2026-05-05	147.00	142.37	Crédito Master | Visa	3.15	4.63	PAGO	2026-05-15 23:30:04.701616	\N
62dd5c44-d634-4e70-bcb8-3a3456754f88	12	4d09a902-8f35-4d3e-a2f3-cc1cc259f7c1	2026-05-05	47.00	45.52	Crédito Master | Visa	3.15	1.48	PAGO	2026-05-15 23:30:22.339051	\N
ce44e86a-d370-49dd-aa3f-b3592ec26e7e	13	fe0c7fe5-87bd-4ccd-9a6c-2c48ad9f5a5e	2026-05-05	110.00	110.00	Pix	0.00	0.00	PAGO	2026-05-15 23:30:42.945192	\N
6e7b3f0f-35c4-40b9-843a-e27f79b52a89	14	41bb3c82-020d-421e-826e-0ecb4709627c	2026-05-05	99.00	99.00	Pix	0.00	0.00	PAGO	2026-05-15 23:31:01.835346	\N
00f90737-4a74-4eb1-93fe-d09eddf2b8ed	15	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	196.00	189.83	Crédito Master | Visa	3.15	6.17	PAGO	2026-05-15 23:47:37.89872	\N
ea0e7ffb-b1d9-4224-819b-fd83aab3c4d5	16	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-15 23:48:48.029826	\N
81025592-2832-479e-8555-6a90e70d36d9	17	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-15 23:49:07.151879	\N
1da34841-d09a-4255-a9bd-b2e43821ecb6	18	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-15 23:49:26.386695	\N
b6e2482c-651d-489d-928d-c604363d448b	19	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	89.00	89.00	Pix	0.00	0.00	PAGO	2026-05-15 23:49:46.314076	\N
5c13f4dc-84dd-4813-9464-790039edb9b4	20	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	90.00	87.17	Crédito Master | Visa	3.15	2.84	PAGO	2026-05-15 23:50:07.68941	\N
1c1b3861-6e36-46b3-8beb-28554d4b4888	21	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-15 23:50:38.482251	\N
5414f15c-64a6-4006-a786-ef41d4541123	22	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	93.00	90.07	Crédito Master | Visa	3.15	2.93	PAGO	2026-05-15 23:51:02.558447	\N
6633fe77-14f9-4bbb-9022-939ffa1e7bc4	23	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	180.00	180.00	Pix	0.00	0.00	PAGO	2026-05-15 23:51:18.824013	\N
dd8291ac-de40-46a5-945d-f3ae47c5547c	26	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	55.00	54.25	Débito Master | Visa	1.37	0.75	PAGO	2026-05-16 00:14:47.116649	\N
38fa63a9-c781-47f3-952f-78233032a6e8	28	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-16 00:17:27.040038	\N
6c152211-0dc2-49b9-a4cb-2eefc2679b01	24	d3056b18-cfbe-4997-b323-72d647901178	2026-05-11	40.00	40.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-15 23:54:30.38247	\N
36dbc8cf-2332-4035-8ed4-63ccbf2e6c76	30	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	79.00	79.00	Pix	0.00	0.00	PAGO	2026-05-16 00:18:12.226155	\N
918d06f2-c720-4161-a90e-e06196841cdb	31	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	149.00	144.31	Crédito Master | Visa	3.15	4.69	PAGO	2026-05-16 00:18:37.493282	\N
e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	58	2ffbcaeb-0676-497f-a625-a809fab32a70	2026-05-17	155.00	155.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 11:22:53.562219	\N
9f18e02d-37e3-429e-af23-c22c7fdb6278	32	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-16 00:19:01.265861	\N
4549c2f2-ed62-457a-b494-a016634abe36	33	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-16 00:19:20.579582	\N
c63805a8-d611-40c4-a060-47f0346b686d	34	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-16 02:04:34.603478	\N
d35d1e96-7190-4133-bcb1-b0ec18f8439b	35	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	35.00	35.00	Pix	0.00	0.00	PAGO	2026-05-16 02:04:50.988768	\N
5de02b5b-6cd2-494e-b220-10c610b2d923	36	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	99.00	95.88	Crédito Master | Visa	3.15	3.12	PAGO	2026-05-16 02:05:08.271798	\N
29d0cd64-ce82-4b49-b6fb-f5493f8443e9	37	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	120.00	116.22	Crédito Master | Visa	3.15	3.78	PAGO	2026-05-16 02:05:31.376074	\N
f1bb341c-87b0-45cd-b798-94ed71434040	38	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-16 02:05:45.76565	\N
3a078226-8547-4318-b36c-397e06d52499	39	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	58.00	56.17	Crédito Master | Visa	3.15	1.83	PAGO	2026-05-16 02:06:14.275711	\N
e885145f-9610-4b8a-bb6b-8d1b7bbeab63	40	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	100.00	100.00	Pix	0.00	0.00	PAGO	2026-05-16 02:06:39.824454	\N
e3491a28-2022-4d31-b5ef-06c22dbcfc4e	41	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-16 02:07:02.989479	\N
5a99cdfb-ac92-447c-adcf-59fc33120e07	43	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-16 20:44:43.505911	\N
11fbbfc7-a58e-4efb-8904-c046ecf46791	44	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	216.00	209.20	Crédito Master | Visa	3.15	6.80	PAGO	2026-05-16 20:45:16.66486	\N
d76369c8-7911-4394-adf0-b0b75845ff6d	45	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	124.00	120.09	Crédito Master | Visa	3.15	3.91	PAGO	2026-05-16 20:45:46.426381	\N
48a6fb1e-4bbe-47a7-9903-2e773b8e2fd5	46	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-16 20:46:09.807748	\N
1ba96e44-a35d-4c07-8c75-9f2b89570634	47	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	114.00	114.00	Pix	0.00	0.00	PAGO	2026-05-16 20:46:34.676137	\N
ab5f6f14-f0da-4a5b-a06c-03c6bcf65b69	48	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-16 20:46:55.416843	\N
35657dea-72b8-44c5-8e5e-1df3bdf45a1d	49	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	99.00	99.00	Pix	0.00	0.00	PAGO	2026-05-16 20:47:13.875862	\N
bbf25b89-d830-4c8f-9bcb-0ab555737d92	50	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	78.00	78.00	Pix	0.00	0.00	PAGO	2026-05-16 20:47:32.932379	\N
a80fd83f-cc74-4a28-8ce2-bb721f3dea65	59	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	126.00	122.03	Crédito Master | Visa	3.15	3.97	PAGO	2026-05-17 12:47:50.532587	\N
4785e3d7-da1e-40b4-9eb9-d3e7a39723b7	60	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	80.00	78.90	Débito Master | Visa	1.37	1.10	PAGO	2026-05-17 12:48:17.796963	\N
f446866d-12e6-414e-9f97-8189ed63c91c	61	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	108.00	104.60	Crédito Master | Visa	3.15	3.40	PAGO	2026-05-17 12:48:41.853367	\N
2b63a779-9e1e-4ba9-a1fa-cb03f5d2346d	62	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	114.00	110.41	Crédito Master | Visa	3.15	3.59	PAGO	2026-05-17 12:49:00.438286	\N
a4bec326-d26b-422a-8792-6f970307f905	63	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-17 12:49:29.075798	\N
4887379e-587d-4bd2-922b-7abd94298aa0	64	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-17 12:49:53.735673	\N
b3e653d6-6c94-457e-9898-4f04114849a0	65	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	49.00	49.00	Pix	0.00	0.00	PAGO	2026-05-17 12:50:13.975909	\N
94f6f425-f794-4600-85ef-d67ef18ce494	66	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-17 12:50:43.964674	\N
2191ee18-3955-4ddb-b9dd-1f564bf4744e	56	61c4798c-e0b0-45ae-bc51-4f9e384bc178	2026-05-13	174.00	174.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-16 20:51:06.965054	\N
f65bfdca-b278-4161-a97f-d0513f837923	54	b4280181-1d59-425c-96ee-5f4808d46765	2026-05-13	59.00	59.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-16 20:50:07.054235	\N
92831dfc-add8-4aef-9d8e-d1f065586610	53	5218d663-d6a4-494c-9157-77ac26e69629	2026-05-13	89.00	89.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-16 20:49:07.471645	\N
daa1b85e-5bb0-4be0-a67c-83bf41fe1e80	52	03a7d684-bb62-4042-881b-6fd70d6b1a92	2026-05-13	147.00	147.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-16 20:48:39.266711	\N
4311b941-502c-4d62-bed3-900ac6355593	27	571f9e26-f977-4785-8824-70156cb777b0	2026-05-12	249.00	249.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-16 00:17:10.128713	\N
9a97508b-6c4f-41e0-a489-6a329392730a	25	541616dd-53c2-433a-b9d0-a0b414f30014	2026-05-11	45.00	45.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-15 23:54:55.293469	\N
9b9a1a9f-495b-4db2-b058-8075a1780838	55	de57f20b-3f2b-4b0d-87ff-52299d620358	2026-05-13	203.00	203.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-16 20:50:38.048366	\N
e60cc389-50ce-4bee-9706-4fc51250eb33	67	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	49.00	47.46	Crédito Master | Visa	3.15	1.54	PAGO	2026-05-17 12:50:59.469524	\N
73f1af8c-b77d-4b2d-8012-7ce6d208f9a5	68	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-17 12:51:22.928976	\N
4e10c86d-6028-478f-9706-96005d49ed5c	69	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-17 12:51:46.3607	\N
1555efa1-b985-403a-a09c-131f59b298a1	70	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	65.00	65.00	Pix	0.00	0.00	PAGO	2026-05-17 12:52:04.803218	\N
f15e19b0-01fb-4dc5-88c0-489a0752ddd1	71	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	128.00	123.97	Crédito Master | Visa	3.15	4.03	PAGO	2026-05-17 12:52:29.397211	\N
82e19cf0-aec6-4120-8b12-e35bbd443c49	72	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	110.00	106.54	Crédito Master | Visa	3.15	3.47	PAGO	2026-05-17 12:52:49.307236	\N
da99fd7a-5807-4f7f-9188-9a1e72b820f9	77	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	47.00	45.52	Crédito Master | Visa	3.15	1.48	PAGO	2026-05-17 13:17:09.009451	\N
ebce7525-c8a5-428d-84e7-63d899489252	78	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	125.00	125.00	Pix	0.00	0.00	PAGO	2026-05-17 13:17:34.228093	\N
071b922e-f96b-4469-97ec-48ec687fc8e1	79	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	127.00	123.00	Crédito Master | Visa	3.15	4.00	PAGO	2026-05-17 13:17:55.658008	\N
91cc80ea-081e-404c-aa14-50d19c97e79b	80	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	274.00	274.00	Pix	0.00	0.00	PAGO	2026-05-17 13:18:14.774827	\N
f7cd5886-2097-49e3-84ed-ca0337b02ce5	74	dc7f62de-22bd-43ed-8b65-449403b44d6f	2026-05-14	59.00	59.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 12:53:47.757061	\N
a9afa99a-2862-425c-a640-f673ba14af08	86	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	139.00	134.62	Crédito Master | Visa	3.15	4.38	PAGO	2026-05-18 19:11:23.231297	\N
3dbd3d38-cc5e-47ca-9854-d63183dc861f	87	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-18 19:11:37.237537	\N
ad2b6ba6-ed56-4942-acb6-c58685c6a825	89	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	89.00	89.00	Pix	0.00	0.00	PAGO	2026-05-18 19:12:40.867586	\N
74c5ba81-f6bb-4de3-8ee6-06e53b39b513	90	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	95.00	92.01	Crédito Master | Visa	3.15	2.99	PAGO	2026-05-18 19:13:01.326373	\N
53cd6762-d038-4eea-90d5-e352d751e4a5	91	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	213.00	206.29	Crédito Master | Visa	3.15	6.71	PAGO	2026-05-18 19:13:20.180821	\N
bab9868f-d987-4ec8-b4e6-6a470e7a241a	93	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	119.00	119.00	Pix	0.00	0.00	PAGO	2026-05-18 19:15:32.338742	\N
205b506d-d213-448c-b550-ad847dffb620	94	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	263.00	254.72	Crédito Master | Visa	3.15	8.28	PAGO	2026-05-18 19:15:46.443146	\N
55660830-038c-4a2e-8642-efa2395b4390	29	e28a90ae-fdfc-4bf8-8a49-a953569e25c5	2026-05-12	144.00	144.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 00:17:51.031748	\N
a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	105	c0aa151d-0aba-4c9a-bc6d-520971eb8f65	2026-05-19	119.00	119.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-19 20:18:44.416395	\N
c1e3a89f-fe3a-4dc1-9a8e-92c2681be6c0	96	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	124.00	120.09	Crédito Master | Visa	3.15	3.91	PAGO	2026-05-19 20:11:18.25871	\N
3a1a6dec-bcdc-4d27-ae58-dc471ab029d5	97	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	198.00	198.00	Pix	0.00	0.00	PAGO	2026-05-19 20:11:43.098312	\N
c615a94f-bf77-4281-b003-6112ccfe980a	98	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	70.00	70.00	Pix	0.00	0.00	PAGO	2026-05-19 20:12:04.81652	\N
abcebc08-0baa-4aba-bed2-6a857ee7a025	99	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	120.00	116.90	Débito American | Cielo	2.58	3.10	PAGO	2026-05-19 20:12:24.236494	\N
dbd228e1-f8f6-4df4-960c-d309640d3087	100	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	300.00	300.00	Pix	0.00	0.00	PAGO	2026-05-19 20:12:45.837304	\N
9abc0afd-0084-45a7-b2bf-bed3bd3e8ae3	101	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	40.00	38.97	Débito American | Cielo	2.58	1.03	PAGO	2026-05-19 20:13:01.309468	\N
c0727a2a-a99e-4015-9498-8f42f3689398	107	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-20 19:58:34.144941	\N
b1af8bb9-8e02-4611-a857-7a5f263a8a1c	110	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	80.00	80.00	Pix	0.00	0.00	PAGO	2026-05-20 20:00:19.164007	\N
8b38c0c2-5904-4309-b725-269c3abc73ca	111	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-20 20:00:40.821146	\N
99fd941f-0ae1-490b-8233-1cadd313612f	113	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-20 20:01:25.039625	\N
0fefd213-0ae8-4c8e-8a54-cd47148a1f56	115	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-20 20:02:07.15786	\N
80e50d36-8fe7-4921-9b0d-bf8f3e586548	114	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	35.00	34.52	Débito Master | Visa	1.37	0.48	PAGO	2026-05-20 20:01:41.793583	\N
489cec38-1522-4fe1-9655-3673a422ed6c	95	afb4cdb8-05c0-45d8-a16c-69038d0324d4	2026-05-18	60.00	60.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-18 19:16:13.535363	\N
900d6999-d493-4c2b-9b8c-e5b9361c2530	102	a9e24e8e-2eb9-4ce8-a8ae-2bec251d21e5	2026-05-19	158.00	158.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-19 20:13:34.817459	\N
8f072efe-806d-4bb0-9054-4927940bfc8b	126	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-27 20:32:05.237584	\N
e93592ed-ed06-4205-a6d9-3359209e1238	127	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-27 20:32:31.874643	\N
5f087220-0eab-4089-9406-013b7cc37bce	83	42a31e31-eb48-4fb8-94f7-d93866663b29	2026-05-15	75.00	75.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 13:20:42.51764	\N
c08bf390-9774-490e-b1f7-360ac3e25884	130	71eeb19b-9be0-4b78-befa-540470cffb0c	2026-05-26	75.00	75.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-27 20:34:59.353108	\N
8855e32b-2b45-4daa-84f6-5ca9fee4c003	109	c19b339d-ce7a-4e00-8213-8030892de285	2026-05-20	49.00	49.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-20 19:59:52.553697	\N
cafc11d3-5460-4046-86c6-ca884b7716ab	108	12b03c8f-3695-47a2-966b-1885fa5a1bad	2026-05-20	128.00	128.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-20 19:59:24.054721	\N
44eee381-2015-46b6-9ad5-9df7e9cb620a	121	3bb6ec2b-0b46-4ae2-84d2-ff95d7af0103	2026-05-18	49.00	49.00	Pix	0.00	0.00	PAGO	2026-05-26 23:12:23.413731	\N
d791b36e-9a99-478e-bc12-ecb2520e31b6	128	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	49.00	49.00	Pix	0.00	0.00	PAGO	2026-05-27 20:32:53.920375	\N
2519490f-2d5e-4421-9283-8400d41e9e67	129	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-27 20:33:17.47972	\N
7e880a15-fe45-4d0d-82ea-9848e93a8e9e	131	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-27 20:58:10.727168	\N
82eb42fd-798e-4b33-8eb8-35a7e80ff92f	132	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	49.00	47.46	Crédito Master | Visa	3.15	1.54	PAGO	2026-05-27 20:58:32.679091	\N
d14ba9a1-0c8c-4881-baf9-78443925a92a	133	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	40.00	38.74	Crédito Master | Visa	3.15	1.26	PAGO	2026-05-27 20:59:04.594961	\N
101c13b0-e9cb-4d4d-918d-4059f0122920	134	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-27 20:59:33.837277	\N
eea41fd2-933b-4e75-ae00-9d7c5373a133	135	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	198.00	198.00	Pix	0.00	0.00	PAGO	2026-05-27 20:59:54.451937	\N
1f4c1628-1250-48b0-b5de-383ccb197085	136	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	49.00	47.46	Crédito Master | Visa	3.15	1.54	PAGO	2026-05-27 21:00:16.475042	\N
a8f03b27-b9f6-46ef-a603-5db891ff0d5b	125	fca883c0-51e4-4a5a-a8d9-ae27fac505af	2026-05-26	179.00	179.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-26 23:25:54.713664	\N
5e3e2e43-8f4c-4697-b516-c7448ec088f0	116	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-05-22	0.50	0.50	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-22 14:29:53.023131	\N
55a61344-4e59-4aa0-b60d-64cfa135bf57	88	0c8d783d-5aea-4277-a7d2-bb88f59952bb	2026-05-18	84.00	84.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-18 19:12:10.989049	\N
e97b26e2-a5f2-4c1e-a63b-5971c081f20c	122	c0aa151d-0aba-4c9a-bc6d-520971eb8f65	2026-05-22	80.00	80.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-26 23:19:06.829863	\N
8264b44e-42e8-4379-b4df-34e0d2b2f19c	81	5f619fe7-3076-482c-b100-bc1e30f82aa4	2026-05-15	237.00	237.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 13:19:22.465439	\N
5eb11394-53b5-4254-821d-45d92f8a0ce6	85	a89b680e-d7af-4473-b7ae-36cafa552e4f	2026-05-15	156.00	156.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 13:23:17.702414	\N
1e8a9988-a7ef-45c5-b883-4f74430c7ebb	82	a4c2f8d9-96f8-44eb-b30e-8e34117920fa	2026-05-15	199.00	199.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 13:20:00.915652	\N
6fd890b0-a3d2-4c7f-b123-cb1de4da9cb8	106	d29586e8-6c89-433e-98db-f4da7b77b82f	2026-05-20	45.00	45.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-20 19:55:04.153909	\N
d72b87b9-a0a8-4ab4-8bbf-ddcf5c0e1204	124	d29586e8-6c89-433e-98db-f4da7b77b82f	2026-05-26	80.00	80.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-26 23:23:23.843063	\N
3d91a855-7ac7-4320-ba75-d4452eb4d6b9	123	04e10bcf-0b80-49ad-8a00-d9af4a455952	2026-05-22	75.00	75.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-26 23:22:52.351231	\N
7785fd56-6559-4658-8c4d-48e6c463d173	120	c604d014-cf0f-42ab-85bd-6ff27519d412	2026-05-22	50.00	50.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-26 14:48:48.773173	\N
cb890f25-04f2-4d50-986a-351529b5e42c	75	fb094592-c779-4046-89f7-f50c2174b4e0	2026-05-14	153.00	153.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 12:54:19.958957	\N
53a7748a-3fbd-4d71-917e-64064d043f75	84	1422293c-edb9-405c-9103-83311bcff646	2026-05-15	79.00	79.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 13:21:00.016358	\N
3b4e31db-993e-4eff-bc55-5ddc7810c19e	117	e28a90ae-fdfc-4bf8-8a49-a953569e25c5	2026-05-12	144.00	144.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-24 15:10:33.371121	\N
4d2125cd-4f8a-48f2-b72f-a1aa1903fadb	73	dcad2126-ab7f-4f45-903c-642941c75bdb	2026-05-14	88.00	88.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 12:53:21.114208	\N
a55382f4-8593-4d38-925c-b868fadc1edb	76	02118891-e850-4c23-bec7-765f04282b05	2026-05-14	104.00	104.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-17 12:54:44.34045	\N
7cb5731e-fb3b-4e82-bccc-7d82bdd6970f	103	2935f91f-96ba-46f8-a030-e158181a0b0b	2026-05-19	79.00	79.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-19 20:13:58.364988	\N
ab7bb6cf-f885-4332-a021-f169e2867c83	104	0960c594-7067-48c8-b330-49ba276270d9	2026-05-19	174.00	174.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-19 20:14:27.244801	\N
f8f1a4d3-13dd-46bd-8ac0-538eda585f07	92	dd1ec731-c383-4e80-97a1-0073b187f233	2026-05-18	79.00	79.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-18 19:13:39.013849	\N
ddfea1c7-ec24-4191-aac4-fc2b317c88ed	118	42265198-db47-4a91-b891-43e3184adb6d	2026-05-22	119.00	119.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-26 14:47:06.924894	\N
14e54650-23c1-45c0-8764-6bd5894d2bf8	119	bd6b01b7-9ef8-4cac-882d-d68ace666140	2026-05-26	90.00	90.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-26 14:47:50.760459	\N
57e92350-ae2e-4f59-bfc9-24ca5a0adc54	137	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	35.00	35.00	Pix	0.00	0.00	PAGO	2026-05-27 21:00:35.20173	\N
d2fcad60-1a74-46a2-a77a-ad0c3dc0135f	138	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	40.00	38.74	Crédito Master | Visa	3.15	1.26	PAGO	2026-05-27 21:00:57.890379	\N
371ff5b1-6cfc-400c-8568-a8a814922ca4	139	42963653-1462-485d-a1a5-ca8832afac72	2026-05-26	40.00	38.74	Crédito Master | Visa	3.15	1.26	PAGO	2026-05-27 21:01:19.4446	\N
bebf13ae-9874-42cb-8677-b723e8d5fb2d	140	42963653-1462-485d-a1a5-ca8832afac72	2026-05-27	118.00	113.04	Link de pagamento	4.20	4.96	PAGO	2026-05-27 21:01:54.38199	\N
0996977b-d01b-4989-ae17-f51073ac7b0f	145	f84c76c9-38b4-4c78-a5bf-02a8e416210c	2026-05-28	187.00	187.00	Pix	0.00	0.00	PAGO	2026-05-28 19:41:56.030129	\N
6e220be9-10ba-487c-8d2f-9c9ad63e3cac	146	42963653-1462-485d-a1a5-ca8832afac72	2026-05-27	48.00	47.34	Débito Master | Visa	1.37	0.66	PAGO	2026-05-28 19:53:46.091216	\N
261f87e7-32be-4c6f-bd89-c43e96c0f402	147	42963653-1462-485d-a1a5-ca8832afac72	2026-05-27	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-28 19:54:13.482597	\N
d079efe6-5c2d-4580-8502-b5ef96397c0c	148	42963653-1462-485d-a1a5-ca8832afac72	2026-05-27	103.00	103.00	Pix	0.00	0.00	PAGO	2026-05-28 19:54:34.151912	\N
258e634f-1890-4904-8fe1-d08f2406c611	149	42963653-1462-485d-a1a5-ca8832afac72	2026-05-27	198.00	191.76	Crédito Master | Visa	3.15	6.24	PAGO	2026-05-28 19:54:57.982246	\N
6c011e66-0ee9-4903-91eb-ee0bb511c47e	150	42963653-1462-485d-a1a5-ca8832afac72	2026-05-27	49.00	49.00	Pix	0.00	0.00	PAGO	2026-05-28 19:55:21.235816	\N
df4b3e8a-9438-4996-8d9d-c898933dc392	151	42963653-1462-485d-a1a5-ca8832afac72	2026-05-27	79.00	79.00	Pix	0.00	0.00	PAGO	2026-05-28 19:55:42.881045	\N
d28d2e82-ac0a-4aba-b729-91d2f4f4cf6f	152	42963653-1462-485d-a1a5-ca8832afac72	2026-05-27	118.00	118.00	Pix	0.00	0.00	PAGO	2026-05-28 19:56:11.731398	\N
8623da60-e52c-4922-8d3d-5f176b1bdcb6	153	42963653-1462-485d-a1a5-ca8832afac72	2026-05-27	108.00	108.00	Pix	0.00	0.00	PAGO	2026-05-28 19:56:32.79449	\N
b5e5b9f1-199a-4528-b3a6-38802649dc73	164	42963653-1462-485d-a1a5-ca8832afac72	2026-05-28	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-28 20:22:08.491537	\N
ecf2166b-72ff-482a-af28-a993737d17e3	166	42963653-1462-485d-a1a5-ca8832afac72	2026-05-28	85.00	85.00	Pix	0.00	0.00	PAGO	2026-05-28 20:24:29.656976	\N
98368cfb-a396-49d0-b2d8-5e3f022433d5	171	42963653-1462-485d-a1a5-ca8832afac72	2026-05-28	118.00	118.00	Pix	0.00	0.00	PAGO	2026-05-28 20:27:06.59052	\N
027cb1a8-0034-4b82-a443-3a89e47fb9c4	173	42963653-1462-485d-a1a5-ca8832afac72	2026-05-28	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-28 20:28:17.31006	\N
7436202a-beae-47f1-a64c-9cfb3f60bbc5	174	42963653-1462-485d-a1a5-ca8832afac72	2026-05-28	128.00	123.97	Crédito Master | Visa	3.15	4.03	PAGO	2026-05-28 20:28:57.914663	\N
7d0fef16-b108-4131-8248-a489435ee3d9	175	42963653-1462-485d-a1a5-ca8832afac72	2026-05-28	59.00	59.00	Pix	0.00	0.00	PAGO	2026-05-28 20:29:10.240586	\N
fab8e9ca-9ff9-4cab-8a42-564543599080	177	42963653-1462-485d-a1a5-ca8832afac72	2026-05-28	65.00	65.00	Pix	0.00	0.00	PAGO	2026-05-28 20:48:10.734539	\N
82a1f713-8e07-4123-8cfc-c35ffe0dc766	154	068a5677-4ea4-471c-99bf-86cb2b10c099	2026-05-27	144.00	144.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 19:58:47.436655	\N
066110f9-f049-4e60-ad57-531fae9d020c	178	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-05-28	0.01	0.01	Pix	0.00	0.00	PAGO	2026-05-29 02:21:46.209124	\N
40f2a259-978d-4689-abfd-9965d37a253d	179	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-05-28	0.01	0.01	Pix	0.00	0.00	PAGO	2026-05-29 02:30:04.039036	\N
f729efa3-4ad5-42a1-bf78-0e57d27ad706	180	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-05-29	0.01	0.01	Pix	0.00	0.00	PAGO	2026-05-29 02:30:59.246279	\N
93020737-b180-4727-8761-e999475bf13e	181	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-05-29	0.01	0.01	Pix	0.00	0.00	PAGO	2026-05-29 02:38:48.938696	\N
1db901a8-a06d-47c7-9c39-91f8a6963eea	163	aa86da8e-5bcf-41c1-b3ff-dc75f5f3b771	2026-05-27	79.00	79.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:02:35.588109	\N
88186e76-0361-4f2f-b512-3f4807710514	112	0f18dd99-28bb-4fd4-b527-297af713423c	2026-05-20	124.00	124.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-20 20:01:03.874956	\N
23800281-b69f-4b1d-b237-d5006e663d4e	183	42963653-1462-485d-a1a5-ca8832afac72	2026-05-29	50.00	48.43	Crédito Master | Visa	3.15	1.58	PAGO	2026-05-29 19:15:11.485078	\N
d99c001f-a8a9-458c-939a-5ae45c3b9f2f	184	42963653-1462-485d-a1a5-ca8832afac72	2026-05-29	80.00	80.00	Pix	0.00	0.00	PAGO	2026-05-29 19:15:44.201317	\N
2f2f5aba-6589-431b-8061-20c674541e5f	185	42963653-1462-485d-a1a5-ca8832afac72	2026-05-29	180.00	180.00	Pix	0.00	0.00	PAGO	2026-05-29 19:15:57.598408	\N
e559e0d5-0f82-4a0a-8373-954e4574f48f	186	42963653-1462-485d-a1a5-ca8832afac72	2026-05-29	60.00	60.00	Pix	0.00	0.00	PAGO	2026-05-29 19:16:16.60481	\N
b5b76081-947d-460e-b774-bb1890de5857	156	82df9d97-c476-43cf-a0ef-01fbbc961281	2026-05-27	100.00	100.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 19:59:53.104863	\N
8b078770-99de-4d77-bcc3-2e2f1e803e57	192	62d50c3f-7f30-41c6-a97c-f9e294521ae9	2026-05-29	65.00	65.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-29 19:54:26.829567	\N
0c51ed62-b867-47e8-af6b-81d2d654ebe4	176	7ba4fd16-b827-44f7-ae3e-9e084e9ae94c	2026-05-28	29.00	29.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:31:13.836661	\N
def98f39-19dc-4cde-b453-848fccaa5bba	187	7ba4fd16-b827-44f7-ae3e-9e084e9ae94c	2026-05-29	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-29 19:18:50.533544	\N
d29e594c-bc57-4c5b-a022-b4ff19e00990	188	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-05-29	0.01	0.01	Pix	0.00	0.00	PAGO	2026-05-29 19:40:00.032152	\N
8331ca3e-cfad-45cb-827f-37811276c1a5	194	42963653-1462-485d-a1a5-ca8832afac72	2026-05-30	0.02	0.02	Pix	0.00	0.00	PAGO	2026-05-30 19:58:51.035105	\N
cab44748-0f98-441b-80d2-090e84bc6bba	195	42963653-1462-485d-a1a5-ca8832afac72	2026-05-30	0.07	0.07	Pix	0.00	0.00	PAGO	2026-05-30 20:05:12.037671	\N
946b4c0b-edda-4fbd-9537-a520c3159892	196	0868576b-90a9-4c3e-9ee0-f337995b072d	2026-06-04	149.00	149.00	Pix	0.00	0.00	PAGO	2026-06-04 18:13:51.323757	\N
208ec073-7f1a-4a25-bbb2-55143bd0a598	197	41bb3c82-020d-421e-826e-0ecb4709627c	2026-06-04	49.00	49.00	Pix	0.00	0.00	PAGO	2026-06-04 18:14:09.77112	\N
be7f7569-2d0e-44e6-b99b-70935285be12	199	42963653-1462-485d-a1a5-ca8832afac72	2026-06-01	95.00	95.00	Pix	0.00	0.00	PAGO	2026-06-04 22:02:40.435383	\N
e932bee4-13a7-4906-8a07-afd765f3c717	200	42963653-1462-485d-a1a5-ca8832afac72	2026-06-01	85.00	85.00	Pix	0.00	0.00	PAGO	2026-06-04 22:03:16.437482	\N
3ce85bb5-6815-4773-8e65-24823c57421e	201	42963653-1462-485d-a1a5-ca8832afac72	2026-06-01	124.00	120.09	Crédito Master | Visa	3.15	3.91	PAGO	2026-06-04 22:03:46.416007	\N
1ab9e510-5405-47cc-a589-70b4fbedc1b0	202	42963653-1462-485d-a1a5-ca8832afac72	2026-06-01	161.95	156.85	Crédito Master | Visa	3.15	5.10	PAGO	2026-06-04 22:12:06.846853	\N
1fcfcdf0-f4df-4a03-a3a4-1c7779690873	203	42963653-1462-485d-a1a5-ca8832afac72	2026-06-01	70.00	70.00	Pix	0.00	0.00	PAGO	2026-06-04 22:13:04.967265	\N
19951426-4292-458a-bc6c-b5b2fd05c180	142	34567cb1-6bba-4da8-a8b8-e94ab65f41a7	2026-05-27	555.00	555.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-27 21:41:59.109766	\N
85ddf75b-c09a-4ed4-9ebb-b93e2fde87fa	198	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-04	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-04 19:10:06.030812	\N
b4023362-b74b-4d23-8a6d-c5c8ee026ab7	182	42963653-1462-485d-a1a5-ca8832afac72	2026-05-28	0.01	0.01	Pix	0.00	0.00	PAGO	2026-05-29 02:52:47.188236	\N
06dbafbe-dbe6-4615-a0e9-6a5c3506297c	190	aeb0b792-f9c5-4472-b9b2-3526e11c5b15	2026-05-29	60.00	60.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-29 19:53:50.987448	\N
b3707044-3c12-49bd-acaa-153231bc8280	159	a59e40c3-de6d-4727-9c88-3ab2d03f8123	2026-05-27	129.00	129.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:01:01.805569	\N
0eabb817-452a-4008-9d6e-9704c614ecbe	155	a906591e-816a-4d12-b087-c188019af2bc	2026-05-27	35.00	35.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 19:59:17.805624	\N
db9e7e21-0a83-47e0-b66d-54c54dec7c8f	168	cb624ad1-f05a-4792-b716-0e577ba7980f	2026-05-28	85.00	85.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:25:53.767727	\N
5a68ddad-3c4c-4e4b-ac38-092350b323f7	157	c89fe789-ee32-4f4f-a723-eae8fe2f638a	2026-05-27	103.00	103.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:00:16.759864	\N
47072fb3-68f3-40ed-b1c9-c0f7de542c25	141	634cdd70-7737-47d3-af78-c9c88e309382	2026-05-26	90.00	90.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-27 21:02:46.805797	\N
3b8ecbec-dbbf-4fbf-9f3e-f0d62afdcc5e	193	33c9fdda-ca62-410a-8318-f436785a9e28	2026-05-29	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-29 23:41:48.777348	\N
ceb14f85-9b27-4b09-b9e1-3a52d1861d50	158	a31777c4-afd6-4eee-b834-615dc3db7e68	2026-05-27	107.00	107.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:00:40.401674	\N
a765161d-1e0f-45f8-b3bd-29c65434ee1f	161	584bc3fe-a098-4e75-b6a0-3b3c32a910d4	2026-05-27	49.00	49.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:01:47.550567	\N
b0a7ca7c-2ea1-4b54-a473-e5dc16d99848	162	5920ebf4-61c2-435b-82c6-e0dca4a155ed	2026-05-27	136.00	136.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:02:13.005923	\N
07c2f6e1-7cd1-4092-8d73-06f416d02443	170	7a39a9a6-14a1-41c8-bdcf-cbcbf00d48fd	2026-05-28	87.00	87.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:26:42.904634	\N
1598ea2d-b68e-4d24-a1d5-b7f9d6786441	143	0573af41-d3e7-4fdc-848e-57929d11f148	2026-05-28	256.00	256.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 19:39:04.905721	\N
7e86f93c-af47-4c6f-803a-7910534a74b0	165	65622ed6-75f4-4a8b-88bd-1dbb13bd995b	2026-05-28	79.00	79.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:24:06.264848	\N
9cc1b082-e158-4480-8c0f-37da95ef6f5f	191	30b263cf-3a92-486b-88d1-9c13188e26eb	2026-05-29	35.00	35.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-29 19:54:14.757202	\N
5eabc7ec-6358-42e6-aa44-10cf4a218a21	160	bb236a78-1258-486b-bf0e-4cf99c89f5ac	2026-05-27	124.00	124.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:01:24.783631	\N
eec2ce01-22f0-40b8-9610-e642d660f659	144	42265198-db47-4a91-b891-43e3184adb6d	2026-05-28	40.00	40.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 19:40:00.642237	\N
6756af8f-206e-4c2a-83e7-979117e21cc6	169	a8497b38-5b49-4653-a339-9234f1907547	2026-05-28	40.00	40.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:26:16.37434	\N
60300d89-35e4-4104-81bf-1b63b95554f5	167	d308890d-42e3-48fa-b014-83373eec2028	2026-05-28	55.00	55.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:25:16.958381	\N
4e665cc7-c1a7-48f1-aca8-af755e777c04	189	11f16b01-448a-4159-9e6e-60e624a62f68	2026-05-29	200.00	200.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-29 19:47:40.849712	\N
7a35056a-e0ce-4ab3-8591-ba082e4f3341	172	013c7314-12b4-4631-ad1e-bd119a9ce7cb	2026-05-28	138.00	138.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-28 20:27:57.352456	\N
dcd56cf7-32f3-4430-8317-17df6521a9d7	204	42963653-1462-485d-a1a5-ca8832afac72	2026-06-01	85.00	82.32	Crédito Master | Visa	3.15	2.68	PAGO	2026-06-04 22:13:29.155705	\N
6a40a38b-0a39-4d28-aa74-a9e73b494a8b	205	42963653-1462-485d-a1a5-ca8832afac72	2026-06-01	50.00	50.00	Pix	0.00	0.00	PAGO	2026-06-04 22:13:47.034268	\N
05a39087-138c-4552-8e8c-35173fffefce	206	42963653-1462-485d-a1a5-ca8832afac72	2026-06-01	149.00	149.00	Pix	0.00	0.00	PAGO	2026-06-04 22:14:22.500139	\N
2e5d3eff-eeec-421d-9e93-af0a7d262106	207	42963653-1462-485d-a1a5-ca8832afac72	2026-06-01	85.00	81.43	Link de pagamento	4.20	3.57	PAGO	2026-06-04 22:14:48.304635	\N
4ef44f90-6575-4ca6-b868-0dbdf79509b5	210	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	49.00	49.00	Pix	0.00	0.00	PAGO	2026-06-04 22:45:45.388958	\N
15149621-f103-46d7-92c8-44914c9bab47	211	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	135.00	130.75	Crédito Master | Visa	3.15	4.25	PAGO	2026-06-04 22:46:14.155429	\N
d2ecfc0f-1eea-44ea-a7e4-16ef273db757	212	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	29.00	29.00	Pix	0.00	0.00	PAGO	2026-06-04 22:49:09.01435	\N
4ad9bfdf-835e-4b3a-be27-ecd2b1ca3f8b	213	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	222.25	222.25	Pix	0.00	0.00	PAGO	2026-06-04 22:52:09.131162	\N
90d130e8-a835-4012-a8d9-9c8d0859e0df	214	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	49.00	47.46	Crédito Master | Visa	3.15	1.54	PAGO	2026-06-04 22:52:30.849559	\N
01779179-3412-4e8f-b7eb-8f2f2593e0fb	215	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	98.00	98.00	Pix	0.00	0.00	PAGO	2026-06-04 22:52:57.958521	\N
f0f8aedf-dcee-441c-87c2-be5f94505ecf	216	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	45.00	43.84	Débito American | Cielo	2.58	1.16	PAGO	2026-06-04 22:53:34.544189	\N
a9894630-fbdb-4d69-a1ed-0ffcbec6ad33	217	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	197.00	194.30	Débito Master | Visa	1.37	2.70	PAGO	2026-06-04 22:55:04.970089	\N
596cd3b7-b86b-49a3-961a-e804767d0d26	218	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	40.00	40.00	Pix	0.00	0.00	PAGO	2026-06-04 23:00:09.308913	\N
243d276d-2d2b-4e89-99b3-d9981cd87771	219	42963653-1462-485d-a1a5-ca8832afac72	2026-06-02	79.00	76.56	Crédito Master | Visa	3.09	2.44	PAGO	2026-06-04 23:00:58.459872	\N
2885ff44-8402-4b7f-879b-415207bd5b46	222	00d3c7a5-53d6-4ea3-a907-b93fcc8ccc61	2026-06-03	170.00	170.00	Pix	0.00	0.00	PARCIAL	2026-06-04 23:28:31.616652	\N
610e29a3-b220-470a-8d64-d4a9c9c5a29f	224	42963653-1462-485d-a1a5-ca8832afac72	2026-06-03	89.00	89.00	Pix	0.00	0.00	PAGO	2026-06-04 23:31:20.72487	\N
1f323e6a-3df8-46cc-bbc9-dab9f2d38b49	226	42963653-1462-485d-a1a5-ca8832afac72	2026-06-03	35.00	35.00	Pix	0.00	0.00	PAGO	2026-06-04 23:32:22.064471	\N
cc0d01d8-4211-4f50-9d01-05c9c29e485f	228	42963653-1462-485d-a1a5-ca8832afac72	2026-06-03	94.00	94.00	Pix	0.00	0.00	PAGO	2026-06-04 23:33:13.047003	\N
917f4a98-8a29-4773-ba30-cef04b0e7322	209	59130896-1c0e-45e0-a449-01381ad008e8	2026-06-01	65.00	65.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-04 22:20:21.58703	\N
67029f1b-4a74-45b4-a605-efd0a611f3b0	230	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-04	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-05 01:49:57.564679	\N
b1025bbd-811a-439f-883a-5b2ea46b5665	231	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-04	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-05 02:29:16.538554	\N
a8f8dab0-7e43-42aa-9c87-91fba9e9dd4c	232	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-04	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-05 02:42:40.29237	\N
dc0490a5-ab35-40d0-8c1e-5ca428165783	229	ec45b1e8-f079-4e80-a27c-ce450048f057	2026-06-03	125.00	125.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-04 23:33:33.920484	\N
c5f8d8b9-a19a-476c-8e7b-2cf2a9c077ab	223	0e0af691-400e-48f5-a7fb-5933008f1a01	2026-06-03	84.00	84.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-04 23:30:49.856849	\N
3824d759-cf0f-4ff3-b9e9-7483f1a14ebb	233	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-05	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-05 20:46:11.469302	\N
3448c0f3-803c-465d-b886-465ff99220c6	235	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-01	0.02	0.02	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-05 21:40:19.30968	\N
b44c8f65-8557-4ad7-a2ce-c37eefa596af	234	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-05	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-05 21:20:57.722666	\N
fee7055d-d1ba-4fbc-91de-171451ad6cd0	237	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-03	0.02	0.02	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-05 21:58:01.073394	\N
6fbff5a1-8c87-4495-b94c-abe00546a75a	236	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-01	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-05 21:57:46.017612	\N
11d964ed-d7f5-4443-b298-cbf6902e93e8	221	0b2bac73-9bb7-4ea6-a951-d39be97aeb58	2026-06-03	40.00	40.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-04 23:27:25.888755	\N
47c8365e-cd48-4f66-9cff-1d3dc0bf6c36	220	a1f0673a-4e6a-4c26-9498-62a1087402bf	2026-06-02	243.00	243.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-04 23:01:30.255826	\N
b17f5f74-fb09-4080-9ff3-38156e7f852e	238	669251c3-b19e-4c19-9238-3960b5cdddac	2026-05-27	29.00	29.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-05 23:01:12.694623	\N
bd8c6b0a-85a6-47c8-8f0d-6a84752b191f	243	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-06	0.03	0.03	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-06 13:30:13.351913	\N
a0661cd7-adce-486c-a534-e14fd3d74b2a	239	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-05	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-06 00:56:39.922728	\N
2866a78a-950f-4400-be64-536fcffb8284	227	3995067f-4df0-4f26-bf28-a55af8a1f896	2026-06-03	103.00	103.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-04 23:32:50.118169	\N
5fbe936c-300c-49f9-b837-8fa1fdef132c	240	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-05	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-06 01:59:12.618336	\N
5d7f3e3a-87cd-4481-907f-eb0820510eb3	261	e21e1f7e-c755-4343-af89-3a3677a62762	2026-06-09	75.00	75.00	Pix	0.00	0.00	PAGO	2026-06-09 21:37:22.665594	\N
e20d0b7b-8f22-47a6-9cf3-d926435f3b72	225	ee8b660a-bba9-4a48-b4c7-1ab89f596da1	2026-06-03	40.00	40.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-04 23:31:54.53897	\N
37731e8c-0880-45b6-9797-e0647e473905	247	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	90.00	90.00	Pix	0.00	0.00	PAGO	2026-06-09 21:14:59.59174	\N
3808084c-39d4-4bb9-8a5b-e098e4685b75	248	14445c7a-dee6-4e1b-b0dc-fbb6b5b97a99	2026-06-09	286.00	286.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-09 21:26:17.17022	\N
0447e3f1-5e03-4790-8a2d-f79fa31f43c4	249	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	85.00	85.00	Pix	0.00	0.00	PAGO	2026-06-09 21:26:51.282361	\N
bfce3655-80c4-4382-8535-f05da81a5287	250	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	40.00	40.00	Pix	0.00	0.00	PAGO	2026-06-09 21:27:12.049494	\N
52f89dda-38f4-4532-b592-c0b1fa2dc31d	251	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	55.00	55.00	Pix	0.00	0.00	PAGO	2026-06-09 21:27:28.786168	\N
b5282b68-3cb9-4a6e-9abd-eb964f0a766b	252	27d44823-4c0e-4ce1-bcc5-3f825f125ce2	2026-06-09	108.00	108.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-09 21:27:53.469158	\N
ce44ead9-29f1-4355-b639-b89657c85427	253	9d234a1c-7cd8-4952-bc08-f41900e7e783	2026-06-09	60.00	60.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-09 21:28:12.418124	\N
c351323f-c618-4945-9688-a2787df3b7c8	255	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	49.00	47.49	Crédito Master | Visa	3.09	1.51	PAGO	2026-06-09 21:30:23.208917	\N
eecc30ce-0a87-48fe-b4c8-e75573b7e20f	262	5128a772-249f-4d06-ac54-d40499f7a007	2026-06-09	75.00	75.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-09 21:38:15.661482	\N
fcb77e8b-7daa-4159-b1db-fc9d1e302e9e	241	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-06	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-06 13:29:36.086071	\N
829493cb-5d95-41bc-93d0-c554122c6648	256	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	40.00	40.00	Pix	0.00	0.00	PAGO	2026-06-09 21:30:44.291116	\N
2c1075dc-9dc9-4295-8e48-b1778665753f	257	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	124.00	121.48	Débito American | Cielo	2.03	2.52	PAGO	2026-06-09 21:31:17.798189	\N
a88c2e14-99a2-489d-820c-5c464f40e440	259	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	55.00	53.30	Crédito Master | Visa	3.09	1.70	PAGO	2026-06-09 21:31:58.116369	\N
5c0b984b-032a-4afd-bbeb-76936d0f426e	260	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	203.00	201.29	Débito Master | Visa	0.84	1.71	PAGO	2026-06-09 21:32:37.515117	\N
5059e1ba-1bca-4abe-bc99-5ddebb3ac2fd	245	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-05-05	0.02	0.02	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-06 16:06:31.751639	\N
4d367552-4b3e-47c9-bd85-04c32283120b	258	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	90.00	90.00	Pix	0.00	0.00	PAGO	2026-06-09 21:31:35.67297	\N
132b7685-6982-4b8e-914a-7cdc9751a047	242	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-03	0.02	0.02	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-06 13:29:58.829185	\N
86e98ef2-2d19-45d1-b3e4-3b5c8a3146e0	244	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-01	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-06 16:06:04.375376	\N
982e8c28-69e4-422c-9390-edf1ccf230bb	254	651dbbcf-fa79-4ad6-aa90-ae6b39fd6f3d	2026-06-09	116.00	116.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-09 21:28:39.831248	\N
4b2b949c-764c-4215-9bbb-f9ad11c7e879	265	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	40.00	40.00	Pix	0.00	0.00	PAGO	2026-06-09 21:55:59.893578	\N
9714ef65-5e8a-4b26-914f-12ad987e091f	266	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	98.00	98.00	Pix	0.00	0.00	PAGO	2026-06-09 21:56:28.546479	\N
c2a14b5a-535f-417d-8961-44b282ce4078	267	42963653-1462-485d-a1a5-ca8832afac72	2026-06-09	50.00	50.00	Pix	0.00	0.00	PAGO	2026-06-09 21:56:49.341347	\N
d7204671-5655-48eb-a393-9244f6a62b79	263	e33e4cd0-a716-4433-b747-ca1150c2da80	2026-06-09	50.00	50.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-09 21:39:42.35431	\N
ddb771af-2a31-4254-a25b-ec32ab5d4978	268	589a0083-ed52-4bb8-ab03-d3363bd22566	2026-06-09	35.00	35.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-09 21:57:10.688755	\N
46bce739-eacf-4755-af2b-3a0a7a31d919	269	9fd43f47-77b1-4352-b6d9-caca865c9b31	2026-06-10	168.00	168.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:08:13.346756	\N
2f857e25-830e-4a80-a091-93273f813406	270	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	98.00	98.00	Pix	0.00	0.00	PAGO	2026-06-10 20:08:45.774048	\N
1d5b9e36-5dc8-4b37-8a6b-4a4f9466d6f2	271	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	114.00	110.48	Crédito Master | Visa	3.09	3.52	PAGO	2026-06-10 20:09:13.432775	\N
01392a0a-fd76-46f4-8fb8-a1ad1f408912	264	80d1408f-e1e8-4ae5-9e99-7b88ab0ea20c	2026-06-09	65.00	65.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-09 21:40:31.863072	\N
ec61269a-cea4-4d1f-a72b-4baa6933c6db	208	80d1408f-e1e8-4ae5-9e99-7b88ab0ea20c	2026-06-01	98.00	98.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-04 22:19:55.872109	\N
ab29e939-f2d8-42c8-8740-495ac34b4b72	272	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	150.00	150.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-10 20:09:34.781656	\N
a1338d2a-82c6-4223-aabc-e12738e68a5a	273	61c4798c-e0b0-45ae-bc51-4f9e384bc178	2026-06-10	188.00	188.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:09:57.779034	\N
9e3a114e-e4e9-48c1-98f5-d8c2c0b988c1	274	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	58.00	58.00	Pix	0.00	0.00	PAGO	2026-06-10 20:10:18.11201	\N
a84b5989-dbac-4cbe-a0b9-f4d0fdfec89e	278	de57f20b-3f2b-4b0d-87ff-52299d620358	2026-06-10	163.00	163.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:11:49.984136	\N
138e2ada-48cb-4f0f-b591-52c7f95e5c8e	275	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	40.00	40.00	Pix	0.00	0.00	PAGO	2026-06-10 20:10:36.739839	\N
e6f194f5-8b65-46bd-bb04-ff1144f14cf2	276	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	170.00	164.75	Crédito Master | Visa	3.09	5.25	PAGO	2026-06-10 20:11:01.535294	\N
508297f7-ff71-4ae5-a37a-87683a63a53c	277	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	107.00	103.69	Crédito Master | Visa	3.09	3.31	PAGO	2026-06-10 20:11:23.134405	\N
9d75ae45-2a50-4631-8c6e-251892c6e9b3	279	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	49.00	49.00	Pix	0.00	0.00	PAGO	2026-06-10 20:12:28.519089	\N
d2a5badd-479b-4040-8667-4f3fccc739df	280	70ae3c45-ccec-4145-b588-0c6e0ba31e98	2026-06-10	98.00	98.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:13:12.400325	\N
4a444506-0c90-4271-8e29-92aef5d0cae5	281	a470062a-b031-456a-a6c8-57a6278c3934	2026-06-10	29.00	29.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:13:35.665648	\N
2c3a93c1-f85a-4bbe-8854-554b55cb82c7	282	9d78b5f3-a8f1-4ef3-a4b9-905d1a270ab7	2026-06-10	89.00	89.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:14:01.638392	\N
58ef46af-90fe-42e6-948c-f4ecb11f5ef5	283	03a7d684-bb62-4042-881b-6fd70d6b1a92	2026-06-10	98.00	98.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:14:25.748148	\N
7d44c7e7-263d-4fac-979d-12ca98a90a7f	284	b303d8f1-92a4-4e87-84ea-7e517650b50d	2026-06-10	132.00	132.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:14:54.721588	\N
31dd3c71-7b58-4625-bb2f-10c62d34c409	285	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	230.00	230.00	Pix	0.00	0.00	PAGO	2026-06-10 20:15:22.302914	\N
21dc3079-29a7-4941-8265-91f0e2997890	286	94842280-2699-4eb6-a4d4-345b116c5e66	2026-06-10	49.00	49.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:15:45.467222	\N
6cfb6d2e-f15a-40bc-8914-e5c312acb4c6	287	f8d97e97-cac7-403b-83e0-bdb73d51735c	2026-06-10	77.00	77.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-10 20:16:22.198688	\N
65376712-911a-4f50-85f0-1f1024971f2a	288	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	104.00	104.00	Pix	0.00	0.00	PAGO	2026-06-10 20:16:45.631343	\N
983d4ed5-f93f-45cf-8600-07cba12982de	289	42963653-1462-485d-a1a5-ca8832afac72	2026-06-10	65.00	65.00	Pix	0.00	0.00	PAGO	2026-06-10 20:17:05.178373	\N
c21edf9f-bc50-4b3c-91a7-e303b199d960	327	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	98.00	93.81	Crédito American | Elo	4.28	4.19	PAGO	2026-06-16 20:55:17.770526	Renata
124b74ce-0a81-4cb5-83cf-6cf334b6e257	316	42963653-1462-485d-a1a5-ca8832afac72	2026-06-15	144.00	139.55	Crédito Master | Visa	3.09	4.45	PAGO	2026-06-16 00:05:18.696244	Adriana
0cc4790c-4b81-4dc5-988e-3811a45b4dd2	317	42963653-1462-485d-a1a5-ca8832afac72	2026-06-15	58.00	58.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-16 00:21:34.803275	Carla
9572ae82-7342-4571-9016-0895a4f2ad2c	328	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	100.00	100.00	Pix	0.00	0.00	PAGO	2026-06-16 20:55:44.16831	José
e1232de8-29fa-4046-b6a8-8e25346c3e62	318	42963653-1462-485d-a1a5-ca8832afac72	2026-06-15	35.00	35.00	Pix	0.00	0.00	PAGO	2026-06-16 00:23:22.905544	Aline
75151dc4-ca46-475d-aa85-da6fe64fd370	329	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	160.00	160.00	Pix	0.00	0.00	PAGO	2026-06-16 20:56:18.331016	Sandra
86c5b6e0-e6d1-418f-ae95-c0c39bfe8e4c	291	c0aa151d-0aba-4c9a-bc6d-520971eb8f65	2026-06-11	120.00	120.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-11 19:44:57.531316	\N
494e1e85-a3ae-49bc-ad38-dab5e03d5ddd	292	42963653-1462-485d-a1a5-ca8832afac72	2026-06-11	125.00	121.14	Crédito Master | Visa	3.09	3.86	PAGO	2026-06-11 19:45:15.232262	\N
81402c86-6332-4f13-8931-47b81252c843	293	42963653-1462-485d-a1a5-ca8832afac72	2026-06-11	45.00	45.00	Pix	0.00	0.00	PAGO	2026-06-11 19:45:35.435013	\N
9be4d906-9b81-4833-a0df-526ab7ee161f	294	42963653-1462-485d-a1a5-ca8832afac72	2026-06-11	158.00	153.12	Crédito Master | Visa	3.09	4.88	PAGO	2026-06-11 19:45:55.995386	\N
1bb60168-ccc1-46cd-aab0-1ae8cdf638b5	295	42963653-1462-485d-a1a5-ca8832afac72	2026-06-11	94.00	94.00	Pix	0.00	0.00	PAGO	2026-06-11 19:46:16.735445	\N
9f2a0371-0091-4d47-bc4e-816bc2fbb1d4	296	42963653-1462-485d-a1a5-ca8832afac72	2026-06-11	65.00	62.99	Crédito Master | Visa	3.09	2.01	PAGO	2026-06-11 19:46:38.129049	\N
e38dee16-3319-428d-a5a8-29d037672cab	297	42963653-1462-485d-a1a5-ca8832afac72	2026-06-11	104.00	100.79	Crédito Master | Visa	3.09	3.21	PAGO	2026-06-11 19:47:04.981491	\N
4f9a9e90-212c-43ec-adb5-179e1855dd38	298	42963653-1462-485d-a1a5-ca8832afac72	2026-06-11	49.00	49.00	Pix	0.00	0.00	PAGO	2026-06-11 19:47:29.503321	\N
e1bb310a-2280-48cf-b839-faf9b97e328f	300	013c7314-12b4-4631-ad1e-bd119a9ce7cb	2026-06-11	126.00	122.11	Crédito Master | Visa	3.09	3.89	PAGO	2026-06-11 19:51:18.416869	\N
be13abde-81f6-42a3-8bb2-9e69e8e55a46	299	634cdd70-7737-47d3-af78-c9c88e309382	2026-06-11	183.00	183.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-11 19:48:00.564039	\N
30b738ab-41c1-42de-9ace-431b99554994	330	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	49.00	49.00	Pix	0.00	0.00	PAGO	2026-06-16 20:56:42.314969	Henrique
058ea45d-c16b-4dd4-bdf0-0f3e1dda16cd	331	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	197.00	188.57	Crédito American | Elo	4.28	8.43	PAGO	2026-06-16 20:57:38.907147	Sueni
d15f4ad6-737b-43fe-954c-410345561bea	246	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-06	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-06 16:06:51.649224	\N
91944b6e-0fb3-44b3-8c1e-ec0c9fce1d08	302	b1f9d073-9f0d-4a4a-8efb-e38d4edd46e1	2026-06-12	200.00	200.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-13 12:44:59.106429	\N
97c70f44-000d-475a-913e-d6280dec780c	319	571f9e26-f977-4785-8824-70156cb777b0	2026-06-15	144.00	144.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-16 00:25:29.99923	\N
63d3f7c4-0d9c-4aa0-8d55-42c85c4ab8dd	304	42963653-1462-485d-a1a5-ca8832afac72	2026-06-12	75.00	75.00	Pix	0.00	0.00	PAGO	2026-06-13 22:33:11.437962	Cecilia
45d1b9ca-89f4-429e-8bac-ad0e1c96f576	305	42963653-1462-485d-a1a5-ca8832afac72	2026-06-12	115.00	115.00	Pix	0.00	0.00	PAGO	2026-06-13 22:37:52.772442	Fadul
e4b3d7be-0f93-4909-bdf5-22d46630d8ce	306	42963653-1462-485d-a1a5-ca8832afac72	2026-06-12	90.00	87.22	Crédito Master | Visa	3.09	2.78	PAGO	2026-06-13 22:38:50.498839	Magno
a1b7449b-46a8-4116-b5a7-b71c042caa7c	307	42963653-1462-485d-a1a5-ca8832afac72	2026-06-12	72.00	72.00	Pix	0.00	0.00	PAGO	2026-06-13 22:39:22.526098	Celio Contato
44cca7e0-524f-4e30-aef4-a35b736b6c82	311	1b80b528-1ede-49b3-a1ad-857e15b5e5a8	2026-06-12	98.00	98.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-13 23:07:35.857404	\N
f57eecc7-f47c-4ad8-9331-6f311a4a1527	310	cb16ce15-8db3-4b02-975c-56d6dc70803b	2026-06-12	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-13 23:06:57.978998	\N
4449921c-aeed-4e04-b327-f62a4ac3cf13	309	1422293c-edb9-405c-9103-83311bcff646	2026-06-12	55.00	55.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-13 23:05:15.963892	\N
714ab0d8-4a3a-47a5-bd71-3ffc5e3df2de	308	01ac627c-7cf7-4e09-8a32-f1ed9edd45f2	2026-06-12	49.00	49.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-13 23:04:36.627745	\N
cb005a65-26a0-4081-8cda-95f93ee599f6	320	e28a90ae-fdfc-4bf8-8a49-a953569e25c5	2026-06-15	370.00	370.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-16 00:40:17.766888	\N
33183259-43da-4646-bb65-be12f0217698	303	42963653-1462-485d-a1a5-ca8832afac72	2026-06-12	220.00	220.00	Pix	0.00	0.00	PAGO	2026-06-13 21:53:14.571811	\N
a868c328-38b9-4426-8f19-f561c8f75496	301	e21e1f7e-c755-4343-af89-3a3677a62762	2026-06-12	98.00	94.97	Crédito Master | Visa	3.09	3.03	PAGO	2026-06-12 14:50:23.996043	\N
9aef2e4c-fea4-4676-b500-0e15f8f8909b	312	80d1408f-e1e8-4ae5-9e99-7b88ab0ea20c	2026-06-13	49.00	49.00	Pix	0.00	0.00	PAGO	2026-06-14 00:08:52.300858	\N
86d5d105-491f-4506-aa8e-17ffaf3314c7	313	21f05c24-083e-4d83-b0a7-ae1701618392	2026-06-13	0.01	0.01	Pix	0.00	0.00	PAGO	2026-06-14 00:09:57.036228	\N
139cc867-f499-42ad-8984-8cd681968eca	314	42963653-1462-485d-a1a5-ca8832afac72	2026-06-15	163.00	163.00	Pix	0.00	0.00	PAGO	2026-06-16 00:02:24.45847	Valdério
d2bc1443-14a7-4e18-a34f-c49cbc2a357e	315	42963653-1462-485d-a1a5-ca8832afac72	2026-06-15	163.00	163.00	Pix	0.00	0.00	PAGO	2026-06-16 00:04:32.768176	Valdério
3ce74009-f96c-4bec-af2d-afbf0e656fc0	290	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-06-10	0.01	0.01	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-10 20:31:32.262441	\N
d41a615e-2261-4bfc-bbce-2deeb2e49f7a	321	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	40.00	40.00	Pix	0.00	0.00	PAGO	2026-06-16 20:44:06.989097	Luciana
ed85ffc6-2b81-46cb-bc7a-482bd3a8ae77	322	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	40.00	40.00	Pix	0.00	0.00	PAGO	2026-06-16 20:45:46.586357	Viviane
f8201b23-b068-42a7-b97c-45e67d7f251c	324	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	145.00	145.00	Pix	0.00	0.00	PAGO	2026-06-16 20:53:16.934383	Sandra
aa7c28a5-aeea-44d4-af5a-1772b5961807	325	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	120.00	120.00	Pix	0.00	0.00	PAGO	2026-06-16 20:53:41.55842	Viviane
d738277c-7a98-4a29-8485-d454923c703b	326	42963653-1462-485d-a1a5-ca8832afac72	2026-06-16	40.00	40.00	Pix	0.00	0.00	PAGO	2026-06-16 20:54:07.323108	Flávia
067ee613-032c-4f68-98c2-71778c57e51c	323	8cd05d23-127e-4c3d-bdde-2986c9d95744	2026-06-16	249.00	249.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-06-16 20:47:49.198541	\N
3e4f7a98-b317-405c-bc26-50494d31bc08	332	42963653-1462-485d-a1a5-ca8832afac72	2026-06-17	208.00	201.57	Crédito Master | Visa	3.09	6.43	PAGO	2026-06-17 23:02:10.868975	Hermínia
8b594967-fdac-422d-980d-e43654743c06	333	a4053193-1f29-4682-8db3-b1ae8883e829	2026-06-17	40.00	40.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-17 23:02:42.545153	\N
940b06a9-011c-433f-9946-dc30ce02a60d	334	de541209-602b-47af-8ede-c508e1dd7860	2026-06-17	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-17 23:03:28.531593	\N
e8129165-07e1-4009-aa06-15afde397a77	335	54b21d33-7c14-4bc9-b89d-43a0b25caaac	2026-06-17	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-17 23:05:34.359363	\N
92bdbf0a-bad4-4a9d-8a0b-420f8cc609ed	336	482b85bf-c598-4d91-b64e-97c09cfb7bd9	2026-06-17	40.00	40.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-17 23:06:06.030265	\N
b6be0a68-a492-4cc3-916f-ebb9ba472e95	337	42963653-1462-485d-a1a5-ca8832afac72	2026-06-17	108.00	104.66	Crédito Master | Visa	3.09	3.34	PAGO	2026-06-17 23:06:28.200495	Maysh
bb138231-02db-487b-b43e-4e2959522eaa	338	42963653-1462-485d-a1a5-ca8832afac72	2026-06-17	75.00	72.68	Crédito Master | Visa	3.09	2.32	PAGO	2026-06-17 23:06:48.546304	Odila
22b95a17-da12-4c53-8325-f8eef6859beb	339	42963653-1462-485d-a1a5-ca8832afac72	2026-06-17	219.00	212.23	Crédito Master | Visa	3.09	6.77	PAGO	2026-06-17 23:07:10.540235	Rosângela
b51006bb-5ac5-4010-9822-6f1ba902b5a7	340	09353ced-354f-4c18-ae4d-973c22d74c62	2026-06-17	50.00	50.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-17 23:07:58.20886	\N
4a95711b-a47c-4476-8891-f2a60b3ed81a	341	42963653-1462-485d-a1a5-ca8832afac72	2026-06-17	45.00	45.00	Pix	0.00	0.00	PAGO	2026-06-17 23:08:19.644707	Fabiana
da89c6e0-839f-481d-ae61-f977b271577e	342	42963653-1462-485d-a1a5-ca8832afac72	2026-06-17	49.00	47.49	Crédito Master | Visa	3.09	1.51	PAGO	2026-06-17 23:08:38.352417	Andreza
6ccbd4e5-0098-4149-85fb-2f26ddcbb205	343	89b2ac7b-7d17-440a-bfd5-742628eecb70	2026-06-18	285.00	285.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-18 22:04:16.970305	\N
0f81a895-d46d-4ec6-9554-90308a9e6af7	344	02118891-e850-4c23-bec7-765f04282b05	2026-06-18	114.00	114.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-18 22:12:12.489917	\N
a35f5f4d-3e35-4905-a0c7-1711e9670614	345	dcad2126-ab7f-4f45-903c-642941c75bdb	2026-06-18	124.00	124.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-18 22:13:55.313448	\N
0ece79c1-83e1-4ebb-a878-70a8f161e46e	346	42963653-1462-485d-a1a5-ca8832afac72	2026-06-18	50.00	50.00	Pix	0.00	0.00	PAGO	2026-06-18 22:16:19.141564	Virna
c08f864c-e23d-410b-92cb-da5cbfc773a8	347	ce828fa9-7664-47af-896b-e82a9a0cd113	2026-06-18	45.00	45.00	Pix	0.00	0.00	PAGO	2026-06-18 22:16:53.281927	\N
a6f7902c-9446-46f5-bf96-e801bd14eee7	349	0ea43ae6-06df-4655-b547-2af2341ff80c	2026-06-18	55.00	55.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-18 22:19:51.930291	\N
3882f273-03e1-4243-9257-423655975653	348	ce828fa9-7664-47af-896b-e82a9a0cd113	2026-06-18	49.00	49.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-18 22:18:15.934896	\N
3d43151f-df3a-4a6a-b0e1-92b5b56ef2be	350	42963653-1462-485d-a1a5-ca8832afac72	2026-06-18	49.00	47.49	Crédito Master | Visa	3.09	1.51	PAGO	2026-06-18 22:20:42.526025	Jade
ef0ea975-20bb-4053-abe8-32c4274df224	351	c1f823a4-ccc5-4be3-a14e-52f19d73d6da	2026-06-18	94.00	94.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-06-18 22:21:51.939932	\N
87913a2e-a1af-4a53-b1f5-49df91ef7f70	352	42963653-1462-485d-a1a5-ca8832afac72	2026-06-18	55.00	55.00	Pix	0.00	0.00	PAGO	2026-06-18 22:22:07.251254	Carol
f1f03345-129a-49a6-b651-3c4a49a524e9	353	42963653-1462-485d-a1a5-ca8832afac72	2026-06-18	92.00	92.00	Pix	0.00	0.00	PAGO	2026-06-18 22:22:20.999007	Renato
800be390-8b9f-41ac-8a66-ba77fceb9656	354	42963653-1462-485d-a1a5-ca8832afac72	2026-06-18	45.00	43.61	Crédito Master | Visa	3.09	1.39	PAGO	2026-06-18 22:22:49.660894	Avulso
\.


--
-- Data for Name: vendas_backup; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendas_backup (id, numero_venda, cliente_id, data_venda, valor_total, valor_liquido, forma_pagamento, taxa_percentual, valor_taxa, status, created_at) FROM stdin;
b81f4153-6d87-4cec-990d-1640330ad6e3	42	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	144.00	139.46	Crédito Master | Visa	3.15	4.54	PAGO	2026-05-16 02:07:19.356297
55660830-038c-4a2e-8642-efa2395b4390	29	e28a90ae-fdfc-4bf8-8a49-a953569e25c5	2026-05-12	288.00	288.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 00:17:51.031748
255b4826-4f26-4891-b3e3-e486008bc611	1	b71e719b-c5bd-4a76-bedd-98447770029b	2026-05-04	340.00	340.00	Pix	0.00	0.00	PAGO	2026-05-15 21:16:37.283001
17726950-2dad-41ad-a643-2bc5a249368c	2	03e36432-3280-440a-b0ce-53ee68f4166c	2026-05-04	179.00	173.36	Crédito Master | Visa	3.15	5.64	PAGO	2026-05-15 21:17:24.545717
4311b941-502c-4d62-bed3-900ac6355593	27	571f9e26-f977-4785-8824-70156cb777b0	2026-05-12	249.00	249.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 00:17:10.128713
1ff6afb1-5ef4-44ef-8c39-57e73f7b6be6	3	28e8e788-226f-439e-97d8-210c5c2bc097	2026-05-04	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-15 21:17:54.154898
f2ecb566-3a57-40ea-8bf6-1a32745fee44	4	88de90f4-ed69-4d6a-8520-b49aaa847519	2026-05-04	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-15 21:18:17.274715
29bdac83-7604-4b57-b979-74aa8a80333f	5	d7cc004f-5b0f-4dfd-8a21-e757565b9512	2026-05-04	35.00	35.00	Pix	0.00	0.00	PAGO	2026-05-15 21:18:42.61083
22be0b61-a8c9-4e27-8aea-ca96bb00ab82	6	8cd05d23-127e-4c3d-bdde-2986c9d95744	2026-05-04	98.00	93.88	Link de pagamento	4.20	4.12	PAGO	2026-05-15 21:19:14.896534
0a650d3a-8954-49e9-a234-2f5c03b2f2e9	7	42963653-1462-485d-a1a5-ca8832afac72	2026-05-05	98.00	98.00	Pix	0.00	0.00	PAGO	2026-05-15 23:28:38.996253
4ce062e3-07d5-4a1e-9111-b83ce8b602c9	8	42963653-1462-485d-a1a5-ca8832afac72	2026-05-05	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-15 23:28:54.694234
208532fe-ec39-40e8-93ab-3ccede046656	9	e21a833b-820f-43f0-b050-770259dbefb8	2026-05-05	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-15 23:29:10.466606
357cb992-7173-4a66-847b-3259299993b0	10	6984057f-a825-4a88-a44c-f4544fb93477	2026-05-05	84.00	84.00	Pix	0.00	0.00	PAGO	2026-05-15 23:29:29.870529
243fecf8-bc09-4d83-9d7e-92bacfc85d40	11	83bc3540-fab3-46e1-99aa-aea3c7d7aa76	2026-05-05	147.00	142.37	Crédito Master | Visa	3.15	4.63	PAGO	2026-05-15 23:30:04.701616
62dd5c44-d634-4e70-bcb8-3a3456754f88	12	4d09a902-8f35-4d3e-a2f3-cc1cc259f7c1	2026-05-05	47.00	45.52	Crédito Master | Visa	3.15	1.48	PAGO	2026-05-15 23:30:22.339051
ce44e86a-d370-49dd-aa3f-b3592ec26e7e	13	fe0c7fe5-87bd-4ccd-9a6c-2c48ad9f5a5e	2026-05-05	110.00	110.00	Pix	0.00	0.00	PAGO	2026-05-15 23:30:42.945192
6e7b3f0f-35c4-40b9-843a-e27f79b52a89	14	41bb3c82-020d-421e-826e-0ecb4709627c	2026-05-05	99.00	99.00	Pix	0.00	0.00	PAGO	2026-05-15 23:31:01.835346
00f90737-4a74-4eb1-93fe-d09eddf2b8ed	15	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	196.00	189.83	Crédito Master | Visa	3.15	6.17	PAGO	2026-05-15 23:47:37.89872
ea0e7ffb-b1d9-4224-819b-fd83aab3c4d5	16	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-15 23:48:48.029826
81025592-2832-479e-8555-6a90e70d36d9	17	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-15 23:49:07.151879
1da34841-d09a-4255-a9bd-b2e43821ecb6	18	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-15 23:49:26.386695
b6e2482c-651d-489d-928d-c604363d448b	19	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	89.00	89.00	Pix	0.00	0.00	PAGO	2026-05-15 23:49:46.314076
5c13f4dc-84dd-4813-9464-790039edb9b4	20	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	90.00	87.17	Crédito Master | Visa	3.15	2.84	PAGO	2026-05-15 23:50:07.68941
1c1b3861-6e36-46b3-8beb-28554d4b4888	21	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-15 23:50:38.482251
5414f15c-64a6-4006-a786-ef41d4541123	22	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	93.00	90.07	Crédito Master | Visa	3.15	2.93	PAGO	2026-05-15 23:51:02.558447
6633fe77-14f9-4bbb-9022-939ffa1e7bc4	23	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	180.00	180.00	Pix	0.00	0.00	PAGO	2026-05-15 23:51:18.824013
dd8291ac-de40-46a5-945d-f3ae47c5547c	26	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	55.00	54.25	Débito Master | Visa	1.37	0.75	PAGO	2026-05-16 00:14:47.116649
38fa63a9-c781-47f3-952f-78233032a6e8	28	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-16 00:17:27.040038
9a97508b-6c4f-41e0-a489-6a329392730a	25	541616dd-53c2-433a-b9d0-a0b414f30014	2026-05-11	45.00	45.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-15 23:54:55.293469
36dbc8cf-2332-4035-8ed4-63ccbf2e6c76	30	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	79.00	79.00	Pix	0.00	0.00	PAGO	2026-05-16 00:18:12.226155
918d06f2-c720-4161-a90e-e06196841cdb	31	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	149.00	144.31	Crédito Master | Visa	3.15	4.69	PAGO	2026-05-16 00:18:37.493282
6c152211-0dc2-49b9-a4cb-2eefc2679b01	24	d3056b18-cfbe-4997-b323-72d647901178	2026-05-11	40.00	40.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-15 23:54:30.38247
9f18e02d-37e3-429e-af23-c22c7fdb6278	32	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-16 00:19:01.265861
4549c2f2-ed62-457a-b494-a016634abe36	33	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-16 00:19:20.579582
c63805a8-d611-40c4-a060-47f0346b686d	34	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-16 02:04:34.603478
d35d1e96-7190-4133-bcb1-b0ec18f8439b	35	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	35.00	35.00	Pix	0.00	0.00	PAGO	2026-05-16 02:04:50.988768
5de02b5b-6cd2-494e-b220-10c610b2d923	36	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	99.00	95.88	Crédito Master | Visa	3.15	3.12	PAGO	2026-05-16 02:05:08.271798
29d0cd64-ce82-4b49-b6fb-f5493f8443e9	37	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	120.00	116.22	Crédito Master | Visa	3.15	3.78	PAGO	2026-05-16 02:05:31.376074
f1bb341c-87b0-45cd-b798-94ed71434040	38	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-16 02:05:45.76565
3a078226-8547-4318-b36c-397e06d52499	39	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	58.00	56.17	Crédito Master | Visa	3.15	1.83	PAGO	2026-05-16 02:06:14.275711
e885145f-9610-4b8a-bb6b-8d1b7bbeab63	40	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	100.00	100.00	Pix	0.00	0.00	PAGO	2026-05-16 02:06:39.824454
e3491a28-2022-4d31-b5ef-06c22dbcfc4e	41	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-16 02:07:02.989479
5a99cdfb-ac92-447c-adcf-59fc33120e07	43	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-16 20:44:43.505911
11fbbfc7-a58e-4efb-8904-c046ecf46791	44	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	216.00	209.20	Crédito Master | Visa	3.15	6.80	PAGO	2026-05-16 20:45:16.66486
d76369c8-7911-4394-adf0-b0b75845ff6d	45	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	124.00	120.09	Crédito Master | Visa	3.15	3.91	PAGO	2026-05-16 20:45:46.426381
48a6fb1e-4bbe-47a7-9903-2e773b8e2fd5	46	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-16 20:46:09.807748
1ba96e44-a35d-4c07-8c75-9f2b89570634	47	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	114.00	114.00	Pix	0.00	0.00	PAGO	2026-05-16 20:46:34.676137
ab5f6f14-f0da-4a5b-a06c-03c6bcf65b69	48	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-16 20:46:55.416843
35657dea-72b8-44c5-8e5e-1df3bdf45a1d	49	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	99.00	99.00	Pix	0.00	0.00	PAGO	2026-05-16 20:47:13.875862
bbf25b89-d830-4c8f-9bcb-0ab555737d92	50	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	78.00	78.00	Pix	0.00	0.00	PAGO	2026-05-16 20:47:32.932379
9617c8e6-e71d-4a31-9983-0c4942ca37a3	51	94842280-2699-4eb6-a4d4-345b116c5e66	2026-05-13	276.00	276.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:48:06.912924
daa1b85e-5bb0-4be0-a67c-83bf41fe1e80	52	03a7d684-bb62-4042-881b-6fd70d6b1a92	2026-05-13	147.00	147.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:48:39.266711
92831dfc-add8-4aef-9d8e-d1f065586610	53	5218d663-d6a4-494c-9157-77ac26e69629	2026-05-13	89.00	89.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:49:07.471645
f65bfdca-b278-4161-a97f-d0513f837923	54	b4280181-1d59-425c-96ee-5f4808d46765	2026-05-13	59.00	59.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:50:07.054235
9b9a1a9f-495b-4db2-b058-8075a1780838	55	de57f20b-3f2b-4b0d-87ff-52299d620358	2026-05-13	203.00	203.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:50:38.048366
2191ee18-3955-4ddb-b9dd-1f564bf4744e	56	61c4798c-e0b0-45ae-bc51-4f9e384bc178	2026-05-13	174.00	174.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:51:06.965054
e586b75f-0f41-4998-a4b2-c2667765f1b5	57	9fd43f47-77b1-4352-b6d9-caca865c9b31	2026-05-13	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:51:31.57706
e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	58	2ffbcaeb-0676-497f-a625-a809fab32a70	2026-05-17	155.00	155.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 11:22:53.562219
a80fd83f-cc74-4a28-8ce2-bb721f3dea65	59	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	126.00	122.03	Crédito Master | Visa	3.15	3.97	PAGO	2026-05-17 12:47:50.532587
4785e3d7-da1e-40b4-9eb9-d3e7a39723b7	60	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	80.00	78.90	Débito Master | Visa	1.37	1.10	PAGO	2026-05-17 12:48:17.796963
f446866d-12e6-414e-9f97-8189ed63c91c	61	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	108.00	104.60	Crédito Master | Visa	3.15	3.40	PAGO	2026-05-17 12:48:41.853367
2b63a779-9e1e-4ba9-a1fa-cb03f5d2346d	62	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	114.00	110.41	Crédito Master | Visa	3.15	3.59	PAGO	2026-05-17 12:49:00.438286
a4bec326-d26b-422a-8792-6f970307f905	63	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-17 12:49:29.075798
4887379e-587d-4bd2-922b-7abd94298aa0	64	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-17 12:49:53.735673
b3e653d6-6c94-457e-9898-4f04114849a0	65	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	49.00	49.00	Pix	0.00	0.00	PAGO	2026-05-17 12:50:13.975909
94f6f425-f794-4600-85ef-d67ef18ce494	66	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-17 12:50:43.964674
e60cc389-50ce-4bee-9706-4fc51250eb33	67	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	49.00	47.46	Crédito Master | Visa	3.15	1.54	PAGO	2026-05-17 12:50:59.469524
73f1af8c-b77d-4b2d-8012-7ce6d208f9a5	68	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-17 12:51:22.928976
4e10c86d-6028-478f-9706-96005d49ed5c	69	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-17 12:51:46.3607
1555efa1-b985-403a-a09c-131f59b298a1	70	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	65.00	65.00	Pix	0.00	0.00	PAGO	2026-05-17 12:52:04.803218
f15e19b0-01fb-4dc5-88c0-489a0752ddd1	71	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	128.00	123.97	Crédito Master | Visa	3.15	4.03	PAGO	2026-05-17 12:52:29.397211
82e19cf0-aec6-4120-8b12-e35bbd443c49	72	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	110.00	106.54	Crédito Master | Visa	3.15	3.47	PAGO	2026-05-17 12:52:49.307236
4d2125cd-4f8a-48f2-b72f-a1aa1903fadb	73	dcad2126-ab7f-4f45-903c-642941c75bdb	2026-05-14	88.00	88.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 12:53:21.114208
f7cd5886-2097-49e3-84ed-ca0337b02ce5	74	dc7f62de-22bd-43ed-8b65-449403b44d6f	2026-05-14	59.00	59.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 12:53:47.757061
cb890f25-04f2-4d50-986a-351529b5e42c	75	fb094592-c779-4046-89f7-f50c2174b4e0	2026-05-14	153.00	153.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 12:54:19.958957
a55382f4-8593-4d38-925c-b868fadc1edb	76	02118891-e850-4c23-bec7-765f04282b05	2026-05-14	104.00	104.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 12:54:44.34045
da99fd7a-5807-4f7f-9188-9a1e72b820f9	77	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	47.00	45.52	Crédito Master | Visa	3.15	1.48	PAGO	2026-05-17 13:17:09.009451
ebce7525-c8a5-428d-84e7-63d899489252	78	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	125.00	125.00	Pix	0.00	0.00	PAGO	2026-05-17 13:17:34.228093
071b922e-f96b-4469-97ec-48ec687fc8e1	79	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	127.00	123.00	Crédito Master | Visa	3.15	4.00	PAGO	2026-05-17 13:17:55.658008
91cc80ea-081e-404c-aa14-50d19c97e79b	80	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	274.00	274.00	Pix	0.00	0.00	PAGO	2026-05-17 13:18:14.774827
8264b44e-42e8-4379-b4df-34e0d2b2f19c	81	5f619fe7-3076-482c-b100-bc1e30f82aa4	2026-05-15	237.00	237.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 13:19:22.465439
1e8a9988-a7ef-45c5-b883-4f74430c7ebb	82	a4c2f8d9-96f8-44eb-b30e-8e34117920fa	2026-05-15	199.00	199.00	Fiado / Em aberto	0.00	0.00	PARCIAL	2026-05-17 13:20:00.915652
5f087220-0eab-4089-9406-013b7cc37bce	83	42a31e31-eb48-4fb8-94f7-d93866663b29	2026-05-15	75.00	75.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 13:20:42.51764
53a7748a-3fbd-4d71-917e-64064d043f75	84	1422293c-edb9-405c-9103-83311bcff646	2026-05-15	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 13:21:00.016358
5eb11394-53b5-4254-821d-45d92f8a0ce6	85	a89b680e-d7af-4473-b7ae-36cafa552e4f	2026-05-15	156.00	156.00	Fiado / Em aberto	0.00	0.00	PARCIAL	2026-05-17 13:23:17.702414
a9afa99a-2862-425c-a640-f673ba14af08	86	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	139.00	134.62	Crédito Master | Visa	3.15	4.38	PAGO	2026-05-18 19:11:23.231297
3dbd3d38-cc5e-47ca-9854-d63183dc861f	87	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-18 19:11:37.237537
ad2b6ba6-ed56-4942-acb6-c58685c6a825	89	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	89.00	89.00	Pix	0.00	0.00	PAGO	2026-05-18 19:12:40.867586
74c5ba81-f6bb-4de3-8ee6-06e53b39b513	90	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	95.00	92.01	Crédito Master | Visa	3.15	2.99	PAGO	2026-05-18 19:13:01.326373
53cd6762-d038-4eea-90d5-e352d751e4a5	91	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	213.00	206.29	Crédito Master | Visa	3.15	6.71	PAGO	2026-05-18 19:13:20.180821
f8f1a4d3-13dd-46bd-8ac0-538eda585f07	92	dd1ec731-c383-4e80-97a1-0073b187f233	2026-05-18	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-18 19:13:39.013849
bab9868f-d987-4ec8-b4e6-6a470e7a241a	93	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	119.00	119.00	Pix	0.00	0.00	PAGO	2026-05-18 19:15:32.338742
205b506d-d213-448c-b550-ad847dffb620	94	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	263.00	254.72	Crédito Master | Visa	3.15	8.28	PAGO	2026-05-18 19:15:46.443146
55a61344-4e59-4aa0-b60d-64cfa135bf57	88	0c8d783d-5aea-4277-a7d2-bb88f59952bb	2026-05-18	84.00	84.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-18 19:12:10.989049
c1e3a89f-fe3a-4dc1-9a8e-92c2681be6c0	96	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	124.00	120.09	Crédito Master | Visa	3.15	3.91	PAGO	2026-05-19 20:11:18.25871
3a1a6dec-bcdc-4d27-ae58-dc471ab029d5	97	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	198.00	198.00	Pix	0.00	0.00	PAGO	2026-05-19 20:11:43.098312
c615a94f-bf77-4281-b003-6112ccfe980a	98	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	70.00	70.00	Pix	0.00	0.00	PAGO	2026-05-19 20:12:04.81652
abcebc08-0baa-4aba-bed2-6a857ee7a025	99	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	120.00	116.90	Débito American | Cielo	2.58	3.10	PAGO	2026-05-19 20:12:24.236494
dbd228e1-f8f6-4df4-960c-d309640d3087	100	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	300.00	300.00	Pix	0.00	0.00	PAGO	2026-05-19 20:12:45.837304
9abc0afd-0084-45a7-b2bf-bed3bd3e8ae3	101	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	40.00	38.97	Débito American | Cielo	2.58	1.03	PAGO	2026-05-19 20:13:01.309468
7cb5731e-fb3b-4e82-bccc-7d82bdd6970f	103	2935f91f-96ba-46f8-a030-e158181a0b0b	2026-05-19	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-19 20:13:58.364988
ab7bb6cf-f885-4332-a021-f169e2867c83	104	0960c594-7067-48c8-b330-49ba276270d9	2026-05-19	174.00	174.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-19 20:14:27.244801
a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	105	c0aa151d-0aba-4c9a-bc6d-520971eb8f65	2026-05-19	119.00	119.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-19 20:18:44.416395
6fd890b0-a3d2-4c7f-b123-cb1de4da9cb8	106	d29586e8-6c89-433e-98db-f4da7b77b82f	2026-05-20	45.00	45.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-20 19:55:04.153909
c0727a2a-a99e-4015-9498-8f42f3689398	107	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-20 19:58:34.144941
cafc11d3-5460-4046-86c6-ca884b7716ab	108	12b03c8f-3695-47a2-966b-1885fa5a1bad	2026-05-20	128.00	128.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-20 19:59:24.054721
8855e32b-2b45-4daa-84f6-5ca9fee4c003	109	c19b339d-ce7a-4e00-8213-8030892de285	2026-05-20	49.00	49.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-20 19:59:52.553697
b1af8bb9-8e02-4611-a857-7a5f263a8a1c	110	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	80.00	80.00	Pix	0.00	0.00	PAGO	2026-05-20 20:00:19.164007
8b38c0c2-5904-4309-b725-269c3abc73ca	111	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-20 20:00:40.821146
88186e76-0361-4f2f-b512-3f4807710514	112	0f18dd99-28bb-4fd4-b527-297af713423c	2026-05-20	124.00	124.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-20 20:01:03.874956
99fd941f-0ae1-490b-8233-1cadd313612f	113	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-20 20:01:25.039625
0fefd213-0ae8-4c8e-8a54-cd47148a1f56	115	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-20 20:02:07.15786
80e50d36-8fe7-4921-9b0d-bf8f3e586548	114	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	35.00	34.52	Débito Master | Visa	1.37	0.48	PAGO	2026-05-20 20:01:41.793583
489cec38-1522-4fe1-9655-3673a422ed6c	95	afb4cdb8-05c0-45d8-a16c-69038d0324d4	2026-05-18	60.00	60.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-18 19:16:13.535363
900d6999-d493-4c2b-9b8c-e5b9361c2530	102	a9e24e8e-2eb9-4ce8-a8ae-2bec251d21e5	2026-05-19	158.00	158.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-19 20:13:34.817459
5e3e2e43-8f4c-4697-b516-c7448ec088f0	116	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-05-22	0.50	0.50	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-22 14:29:53.023131
\.


--
-- Data for Name: vendas_backup_20260523; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vendas_backup_20260523 (id, numero_venda, cliente_id, data_venda, valor_total, valor_liquido, forma_pagamento, taxa_percentual, valor_taxa, status, created_at) FROM stdin;
b81f4153-6d87-4cec-990d-1640330ad6e3	42	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	144.00	139.46	Crédito Master | Visa	3.15	4.54	PAGO	2026-05-16 02:07:19.356297
55660830-038c-4a2e-8642-efa2395b4390	29	e28a90ae-fdfc-4bf8-8a49-a953569e25c5	2026-05-12	288.00	288.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 00:17:51.031748
255b4826-4f26-4891-b3e3-e486008bc611	1	b71e719b-c5bd-4a76-bedd-98447770029b	2026-05-04	340.00	340.00	Pix	0.00	0.00	PAGO	2026-05-15 21:16:37.283001
17726950-2dad-41ad-a643-2bc5a249368c	2	03e36432-3280-440a-b0ce-53ee68f4166c	2026-05-04	179.00	173.36	Crédito Master | Visa	3.15	5.64	PAGO	2026-05-15 21:17:24.545717
4311b941-502c-4d62-bed3-900ac6355593	27	571f9e26-f977-4785-8824-70156cb777b0	2026-05-12	249.00	249.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 00:17:10.128713
1ff6afb1-5ef4-44ef-8c39-57e73f7b6be6	3	28e8e788-226f-439e-97d8-210c5c2bc097	2026-05-04	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-15 21:17:54.154898
f2ecb566-3a57-40ea-8bf6-1a32745fee44	4	88de90f4-ed69-4d6a-8520-b49aaa847519	2026-05-04	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-15 21:18:17.274715
29bdac83-7604-4b57-b979-74aa8a80333f	5	d7cc004f-5b0f-4dfd-8a21-e757565b9512	2026-05-04	35.00	35.00	Pix	0.00	0.00	PAGO	2026-05-15 21:18:42.61083
22be0b61-a8c9-4e27-8aea-ca96bb00ab82	6	8cd05d23-127e-4c3d-bdde-2986c9d95744	2026-05-04	98.00	93.88	Link de pagamento	4.20	4.12	PAGO	2026-05-15 21:19:14.896534
0a650d3a-8954-49e9-a234-2f5c03b2f2e9	7	42963653-1462-485d-a1a5-ca8832afac72	2026-05-05	98.00	98.00	Pix	0.00	0.00	PAGO	2026-05-15 23:28:38.996253
4ce062e3-07d5-4a1e-9111-b83ce8b602c9	8	42963653-1462-485d-a1a5-ca8832afac72	2026-05-05	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-15 23:28:54.694234
208532fe-ec39-40e8-93ab-3ccede046656	9	e21a833b-820f-43f0-b050-770259dbefb8	2026-05-05	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-15 23:29:10.466606
357cb992-7173-4a66-847b-3259299993b0	10	6984057f-a825-4a88-a44c-f4544fb93477	2026-05-05	84.00	84.00	Pix	0.00	0.00	PAGO	2026-05-15 23:29:29.870529
243fecf8-bc09-4d83-9d7e-92bacfc85d40	11	83bc3540-fab3-46e1-99aa-aea3c7d7aa76	2026-05-05	147.00	142.37	Crédito Master | Visa	3.15	4.63	PAGO	2026-05-15 23:30:04.701616
62dd5c44-d634-4e70-bcb8-3a3456754f88	12	4d09a902-8f35-4d3e-a2f3-cc1cc259f7c1	2026-05-05	47.00	45.52	Crédito Master | Visa	3.15	1.48	PAGO	2026-05-15 23:30:22.339051
ce44e86a-d370-49dd-aa3f-b3592ec26e7e	13	fe0c7fe5-87bd-4ccd-9a6c-2c48ad9f5a5e	2026-05-05	110.00	110.00	Pix	0.00	0.00	PAGO	2026-05-15 23:30:42.945192
6e7b3f0f-35c4-40b9-843a-e27f79b52a89	14	41bb3c82-020d-421e-826e-0ecb4709627c	2026-05-05	99.00	99.00	Pix	0.00	0.00	PAGO	2026-05-15 23:31:01.835346
00f90737-4a74-4eb1-93fe-d09eddf2b8ed	15	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	196.00	189.83	Crédito Master | Visa	3.15	6.17	PAGO	2026-05-15 23:47:37.89872
ea0e7ffb-b1d9-4224-819b-fd83aab3c4d5	16	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-15 23:48:48.029826
81025592-2832-479e-8555-6a90e70d36d9	17	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-15 23:49:07.151879
1da34841-d09a-4255-a9bd-b2e43821ecb6	18	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-15 23:49:26.386695
b6e2482c-651d-489d-928d-c604363d448b	19	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	89.00	89.00	Pix	0.00	0.00	PAGO	2026-05-15 23:49:46.314076
5c13f4dc-84dd-4813-9464-790039edb9b4	20	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	90.00	87.17	Crédito Master | Visa	3.15	2.84	PAGO	2026-05-15 23:50:07.68941
1c1b3861-6e36-46b3-8beb-28554d4b4888	21	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-15 23:50:38.482251
5414f15c-64a6-4006-a786-ef41d4541123	22	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	93.00	90.07	Crédito Master | Visa	3.15	2.93	PAGO	2026-05-15 23:51:02.558447
6633fe77-14f9-4bbb-9022-939ffa1e7bc4	23	42963653-1462-485d-a1a5-ca8832afac72	2026-05-11	180.00	180.00	Pix	0.00	0.00	PAGO	2026-05-15 23:51:18.824013
dd8291ac-de40-46a5-945d-f3ae47c5547c	26	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	55.00	54.25	Débito Master | Visa	1.37	0.75	PAGO	2026-05-16 00:14:47.116649
38fa63a9-c781-47f3-952f-78233032a6e8	28	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-16 00:17:27.040038
9a97508b-6c4f-41e0-a489-6a329392730a	25	541616dd-53c2-433a-b9d0-a0b414f30014	2026-05-11	45.00	45.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-15 23:54:55.293469
36dbc8cf-2332-4035-8ed4-63ccbf2e6c76	30	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	79.00	79.00	Pix	0.00	0.00	PAGO	2026-05-16 00:18:12.226155
918d06f2-c720-4161-a90e-e06196841cdb	31	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	149.00	144.31	Crédito Master | Visa	3.15	4.69	PAGO	2026-05-16 00:18:37.493282
6c152211-0dc2-49b9-a4cb-2eefc2679b01	24	d3056b18-cfbe-4997-b323-72d647901178	2026-05-11	40.00	40.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-15 23:54:30.38247
9f18e02d-37e3-429e-af23-c22c7fdb6278	32	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-16 00:19:01.265861
4549c2f2-ed62-457a-b494-a016634abe36	33	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-16 00:19:20.579582
c63805a8-d611-40c4-a060-47f0346b686d	34	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-16 02:04:34.603478
d35d1e96-7190-4133-bcb1-b0ec18f8439b	35	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	35.00	35.00	Pix	0.00	0.00	PAGO	2026-05-16 02:04:50.988768
5de02b5b-6cd2-494e-b220-10c610b2d923	36	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	99.00	95.88	Crédito Master | Visa	3.15	3.12	PAGO	2026-05-16 02:05:08.271798
29d0cd64-ce82-4b49-b6fb-f5493f8443e9	37	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	120.00	116.22	Crédito Master | Visa	3.15	3.78	PAGO	2026-05-16 02:05:31.376074
f1bb341c-87b0-45cd-b798-94ed71434040	38	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	90.00	90.00	Pix	0.00	0.00	PAGO	2026-05-16 02:05:45.76565
3a078226-8547-4318-b36c-397e06d52499	39	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	58.00	56.17	Crédito Master | Visa	3.15	1.83	PAGO	2026-05-16 02:06:14.275711
e885145f-9610-4b8a-bb6b-8d1b7bbeab63	40	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	100.00	100.00	Pix	0.00	0.00	PAGO	2026-05-16 02:06:39.824454
e3491a28-2022-4d31-b5ef-06c22dbcfc4e	41	42963653-1462-485d-a1a5-ca8832afac72	2026-05-12	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-16 02:07:02.989479
5a99cdfb-ac92-447c-adcf-59fc33120e07	43	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	89.00	86.20	Crédito Master | Visa	3.15	2.80	PAGO	2026-05-16 20:44:43.505911
11fbbfc7-a58e-4efb-8904-c046ecf46791	44	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	216.00	209.20	Crédito Master | Visa	3.15	6.80	PAGO	2026-05-16 20:45:16.66486
d76369c8-7911-4394-adf0-b0b75845ff6d	45	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	124.00	120.09	Crédito Master | Visa	3.15	3.91	PAGO	2026-05-16 20:45:46.426381
48a6fb1e-4bbe-47a7-9903-2e773b8e2fd5	46	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-16 20:46:09.807748
1ba96e44-a35d-4c07-8c75-9f2b89570634	47	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	114.00	114.00	Pix	0.00	0.00	PAGO	2026-05-16 20:46:34.676137
ab5f6f14-f0da-4a5b-a06c-03c6bcf65b69	48	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-16 20:46:55.416843
35657dea-72b8-44c5-8e5e-1df3bdf45a1d	49	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	99.00	99.00	Pix	0.00	0.00	PAGO	2026-05-16 20:47:13.875862
bbf25b89-d830-4c8f-9bcb-0ab555737d92	50	42963653-1462-485d-a1a5-ca8832afac72	2026-05-13	78.00	78.00	Pix	0.00	0.00	PAGO	2026-05-16 20:47:32.932379
9617c8e6-e71d-4a31-9983-0c4942ca37a3	51	94842280-2699-4eb6-a4d4-345b116c5e66	2026-05-13	276.00	276.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:48:06.912924
daa1b85e-5bb0-4be0-a67c-83bf41fe1e80	52	03a7d684-bb62-4042-881b-6fd70d6b1a92	2026-05-13	147.00	147.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:48:39.266711
92831dfc-add8-4aef-9d8e-d1f065586610	53	5218d663-d6a4-494c-9157-77ac26e69629	2026-05-13	89.00	89.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:49:07.471645
f65bfdca-b278-4161-a97f-d0513f837923	54	b4280181-1d59-425c-96ee-5f4808d46765	2026-05-13	59.00	59.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:50:07.054235
9b9a1a9f-495b-4db2-b058-8075a1780838	55	de57f20b-3f2b-4b0d-87ff-52299d620358	2026-05-13	203.00	203.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:50:38.048366
2191ee18-3955-4ddb-b9dd-1f564bf4744e	56	61c4798c-e0b0-45ae-bc51-4f9e384bc178	2026-05-13	174.00	174.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:51:06.965054
e586b75f-0f41-4998-a4b2-c2667765f1b5	57	9fd43f47-77b1-4352-b6d9-caca865c9b31	2026-05-13	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-16 20:51:31.57706
e8ccbcf7-a9e4-4a77-80b7-7d27be704f2d	58	2ffbcaeb-0676-497f-a625-a809fab32a70	2026-05-17	155.00	155.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 11:22:53.562219
a80fd83f-cc74-4a28-8ce2-bb721f3dea65	59	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	126.00	122.03	Crédito Master | Visa	3.15	3.97	PAGO	2026-05-17 12:47:50.532587
4785e3d7-da1e-40b4-9eb9-d3e7a39723b7	60	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	80.00	78.90	Débito Master | Visa	1.37	1.10	PAGO	2026-05-17 12:48:17.796963
f446866d-12e6-414e-9f97-8189ed63c91c	61	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	108.00	104.60	Crédito Master | Visa	3.15	3.40	PAGO	2026-05-17 12:48:41.853367
2b63a779-9e1e-4ba9-a1fa-cb03f5d2346d	62	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	114.00	110.41	Crédito Master | Visa	3.15	3.59	PAGO	2026-05-17 12:49:00.438286
a4bec326-d26b-422a-8792-6f970307f905	63	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-17 12:49:29.075798
4887379e-587d-4bd2-922b-7abd94298aa0	64	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-17 12:49:53.735673
b3e653d6-6c94-457e-9898-4f04114849a0	65	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	49.00	49.00	Pix	0.00	0.00	PAGO	2026-05-17 12:50:13.975909
94f6f425-f794-4600-85ef-d67ef18ce494	66	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	35.00	33.90	Crédito Master | Visa	3.15	1.10	PAGO	2026-05-17 12:50:43.964674
e60cc389-50ce-4bee-9706-4fc51250eb33	67	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	49.00	47.46	Crédito Master | Visa	3.15	1.54	PAGO	2026-05-17 12:50:59.469524
73f1af8c-b77d-4b2d-8012-7ce6d208f9a5	68	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-17 12:51:22.928976
4e10c86d-6028-478f-9706-96005d49ed5c	69	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	50.00	50.00	Pix	0.00	0.00	PAGO	2026-05-17 12:51:46.3607
1555efa1-b985-403a-a09c-131f59b298a1	70	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	65.00	65.00	Pix	0.00	0.00	PAGO	2026-05-17 12:52:04.803218
f15e19b0-01fb-4dc5-88c0-489a0752ddd1	71	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	128.00	123.97	Crédito Master | Visa	3.15	4.03	PAGO	2026-05-17 12:52:29.397211
82e19cf0-aec6-4120-8b12-e35bbd443c49	72	42963653-1462-485d-a1a5-ca8832afac72	2026-05-14	110.00	106.54	Crédito Master | Visa	3.15	3.47	PAGO	2026-05-17 12:52:49.307236
4d2125cd-4f8a-48f2-b72f-a1aa1903fadb	73	dcad2126-ab7f-4f45-903c-642941c75bdb	2026-05-14	88.00	88.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 12:53:21.114208
f7cd5886-2097-49e3-84ed-ca0337b02ce5	74	dc7f62de-22bd-43ed-8b65-449403b44d6f	2026-05-14	59.00	59.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 12:53:47.757061
cb890f25-04f2-4d50-986a-351529b5e42c	75	fb094592-c779-4046-89f7-f50c2174b4e0	2026-05-14	153.00	153.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 12:54:19.958957
a55382f4-8593-4d38-925c-b868fadc1edb	76	02118891-e850-4c23-bec7-765f04282b05	2026-05-14	104.00	104.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 12:54:44.34045
da99fd7a-5807-4f7f-9188-9a1e72b820f9	77	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	47.00	45.52	Crédito Master | Visa	3.15	1.48	PAGO	2026-05-17 13:17:09.009451
ebce7525-c8a5-428d-84e7-63d899489252	78	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	125.00	125.00	Pix	0.00	0.00	PAGO	2026-05-17 13:17:34.228093
071b922e-f96b-4469-97ec-48ec687fc8e1	79	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	127.00	123.00	Crédito Master | Visa	3.15	4.00	PAGO	2026-05-17 13:17:55.658008
91cc80ea-081e-404c-aa14-50d19c97e79b	80	42963653-1462-485d-a1a5-ca8832afac72	2026-05-15	274.00	274.00	Pix	0.00	0.00	PAGO	2026-05-17 13:18:14.774827
8264b44e-42e8-4379-b4df-34e0d2b2f19c	81	5f619fe7-3076-482c-b100-bc1e30f82aa4	2026-05-15	237.00	237.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 13:19:22.465439
1e8a9988-a7ef-45c5-b883-4f74430c7ebb	82	a4c2f8d9-96f8-44eb-b30e-8e34117920fa	2026-05-15	199.00	199.00	Fiado / Em aberto	0.00	0.00	PARCIAL	2026-05-17 13:20:00.915652
5f087220-0eab-4089-9406-013b7cc37bce	83	42a31e31-eb48-4fb8-94f7-d93866663b29	2026-05-15	75.00	75.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 13:20:42.51764
53a7748a-3fbd-4d71-917e-64064d043f75	84	1422293c-edb9-405c-9103-83311bcff646	2026-05-15	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-17 13:21:00.016358
5eb11394-53b5-4254-821d-45d92f8a0ce6	85	a89b680e-d7af-4473-b7ae-36cafa552e4f	2026-05-15	156.00	156.00	Fiado / Em aberto	0.00	0.00	PARCIAL	2026-05-17 13:23:17.702414
a9afa99a-2862-425c-a640-f673ba14af08	86	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	139.00	134.62	Crédito Master | Visa	3.15	4.38	PAGO	2026-05-18 19:11:23.231297
3dbd3d38-cc5e-47ca-9854-d63183dc861f	87	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-18 19:11:37.237537
ad2b6ba6-ed56-4942-acb6-c58685c6a825	89	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	89.00	89.00	Pix	0.00	0.00	PAGO	2026-05-18 19:12:40.867586
74c5ba81-f6bb-4de3-8ee6-06e53b39b513	90	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	95.00	92.01	Crédito Master | Visa	3.15	2.99	PAGO	2026-05-18 19:13:01.326373
53cd6762-d038-4eea-90d5-e352d751e4a5	91	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	213.00	206.29	Crédito Master | Visa	3.15	6.71	PAGO	2026-05-18 19:13:20.180821
f8f1a4d3-13dd-46bd-8ac0-538eda585f07	92	dd1ec731-c383-4e80-97a1-0073b187f233	2026-05-18	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-18 19:13:39.013849
bab9868f-d987-4ec8-b4e6-6a470e7a241a	93	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	119.00	119.00	Pix	0.00	0.00	PAGO	2026-05-18 19:15:32.338742
205b506d-d213-448c-b550-ad847dffb620	94	42963653-1462-485d-a1a5-ca8832afac72	2026-05-18	263.00	254.72	Crédito Master | Visa	3.15	8.28	PAGO	2026-05-18 19:15:46.443146
55a61344-4e59-4aa0-b60d-64cfa135bf57	88	0c8d783d-5aea-4277-a7d2-bb88f59952bb	2026-05-18	84.00	84.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-18 19:12:10.989049
c1e3a89f-fe3a-4dc1-9a8e-92c2681be6c0	96	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	124.00	120.09	Crédito Master | Visa	3.15	3.91	PAGO	2026-05-19 20:11:18.25871
3a1a6dec-bcdc-4d27-ae58-dc471ab029d5	97	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	198.00	198.00	Pix	0.00	0.00	PAGO	2026-05-19 20:11:43.098312
c615a94f-bf77-4281-b003-6112ccfe980a	98	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	70.00	70.00	Pix	0.00	0.00	PAGO	2026-05-19 20:12:04.81652
abcebc08-0baa-4aba-bed2-6a857ee7a025	99	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	120.00	116.90	Débito American | Cielo	2.58	3.10	PAGO	2026-05-19 20:12:24.236494
dbd228e1-f8f6-4df4-960c-d309640d3087	100	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	300.00	300.00	Pix	0.00	0.00	PAGO	2026-05-19 20:12:45.837304
9abc0afd-0084-45a7-b2bf-bed3bd3e8ae3	101	42963653-1462-485d-a1a5-ca8832afac72	2026-05-19	40.00	38.97	Débito American | Cielo	2.58	1.03	PAGO	2026-05-19 20:13:01.309468
7cb5731e-fb3b-4e82-bccc-7d82bdd6970f	103	2935f91f-96ba-46f8-a030-e158181a0b0b	2026-05-19	79.00	79.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-19 20:13:58.364988
ab7bb6cf-f885-4332-a021-f169e2867c83	104	0960c594-7067-48c8-b330-49ba276270d9	2026-05-19	174.00	174.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-19 20:14:27.244801
a2ab5bd2-f9a5-4f88-9b12-60676bb25ba3	105	c0aa151d-0aba-4c9a-bc6d-520971eb8f65	2026-05-19	119.00	119.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-19 20:18:44.416395
6fd890b0-a3d2-4c7f-b123-cb1de4da9cb8	106	d29586e8-6c89-433e-98db-f4da7b77b82f	2026-05-20	45.00	45.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-20 19:55:04.153909
c0727a2a-a99e-4015-9498-8f42f3689398	107	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	45.00	43.58	Crédito Master | Visa	3.15	1.42	PAGO	2026-05-20 19:58:34.144941
cafc11d3-5460-4046-86c6-ca884b7716ab	108	12b03c8f-3695-47a2-966b-1885fa5a1bad	2026-05-20	128.00	128.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-20 19:59:24.054721
8855e32b-2b45-4daa-84f6-5ca9fee4c003	109	c19b339d-ce7a-4e00-8213-8030892de285	2026-05-20	49.00	49.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-20 19:59:52.553697
b1af8bb9-8e02-4611-a857-7a5f263a8a1c	110	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	80.00	80.00	Pix	0.00	0.00	PAGO	2026-05-20 20:00:19.164007
8b38c0c2-5904-4309-b725-269c3abc73ca	111	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	55.00	55.00	Pix	0.00	0.00	PAGO	2026-05-20 20:00:40.821146
88186e76-0361-4f2f-b512-3f4807710514	112	0f18dd99-28bb-4fd4-b527-297af713423c	2026-05-20	124.00	124.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-20 20:01:03.874956
99fd941f-0ae1-490b-8233-1cadd313612f	113	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	40.00	40.00	Pix	0.00	0.00	PAGO	2026-05-20 20:01:25.039625
0fefd213-0ae8-4c8e-8a54-cd47148a1f56	115	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	45.00	45.00	Pix	0.00	0.00	PAGO	2026-05-20 20:02:07.15786
80e50d36-8fe7-4921-9b0d-bf8f3e586548	114	42963653-1462-485d-a1a5-ca8832afac72	2026-05-20	35.00	34.52	Débito Master | Visa	1.37	0.48	PAGO	2026-05-20 20:01:41.793583
489cec38-1522-4fe1-9655-3673a422ed6c	95	afb4cdb8-05c0-45d8-a16c-69038d0324d4	2026-05-18	60.00	60.00	Fiado / Em aberto	0.00	0.00	PAGO	2026-05-18 19:16:13.535363
900d6999-d493-4c2b-9b8c-e5b9361c2530	102	a9e24e8e-2eb9-4ce8-a8ae-2bec251d21e5	2026-05-19	158.00	158.00	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-19 20:13:34.817459
5e3e2e43-8f4c-4697-b516-c7448ec088f0	116	298c98d7-a412-4fb3-8f48-a026a12ebfdf	2026-05-22	0.50	0.50	Fiado / Em aberto	0.00	0.00	EM ABERTO	2026-05-22 14:29:53.023131
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2026-05-09 23:18:16
20211116045059	2026-05-09 23:18:17
20211116050929	2026-05-09 23:18:18
20211116051442	2026-05-09 23:18:19
20211116212300	2026-05-09 23:18:21
20211116213355	2026-05-09 23:18:22
20211116213934	2026-05-09 23:18:23
20211116214523	2026-05-09 23:18:24
20211122062447	2026-05-09 23:18:26
20211124070109	2026-05-09 23:18:27
20211202204204	2026-05-09 23:18:28
20211202204605	2026-05-09 23:18:29
20211210212804	2026-05-09 23:18:32
20211228014915	2026-05-09 23:18:34
20220107221237	2026-05-09 23:18:35
20220228202821	2026-05-09 23:18:36
20220312004840	2026-05-09 23:18:37
20220603231003	2026-05-09 23:18:39
20220603232444	2026-05-09 23:18:40
20220615214548	2026-05-09 23:18:41
20220712093339	2026-05-09 23:18:42
20220908172859	2026-05-09 23:18:43
20220916233421	2026-05-09 23:18:45
20230119133233	2026-05-09 23:18:46
20230128025114	2026-05-09 23:18:47
20230128025212	2026-05-09 23:18:48
20230227211149	2026-05-09 23:18:49
20230228184745	2026-05-09 23:18:51
20230308225145	2026-05-09 23:18:52
20230328144023	2026-05-09 23:18:53
20231018144023	2026-05-09 23:18:54
20231204144023	2026-05-09 23:18:56
20231204144024	2026-05-09 23:18:57
20231204144025	2026-05-09 23:18:58
20240108234812	2026-05-09 23:18:59
20240109165339	2026-05-09 23:19:00
20240227174441	2026-05-09 23:19:02
20240311171622	2026-05-09 23:19:04
20240321100241	2026-05-09 23:19:06
20240401105812	2026-05-09 23:19:10
20240418121054	2026-05-09 23:19:11
20240523004032	2026-05-09 23:19:15
20240618124746	2026-05-09 23:19:16
20240801235015	2026-05-09 23:19:17
20240805133720	2026-05-09 23:19:18
20240827160934	2026-05-09 23:19:20
20240919163303	2026-05-09 23:19:21
20240919163305	2026-05-09 23:19:22
20241019105805	2026-05-09 23:19:23
20241030150047	2026-05-09 23:19:28
20241108114728	2026-05-09 23:19:29
20241121104152	2026-05-09 23:19:30
20241130184212	2026-05-09 23:19:32
20241220035512	2026-05-09 23:19:33
20241220123912	2026-05-09 23:19:34
20241224161212	2026-05-09 23:19:35
20250107150512	2026-05-09 23:19:36
20250110162412	2026-05-09 23:19:37
20250123174212	2026-05-09 23:19:38
20250128220012	2026-05-09 23:19:39
20250506224012	2026-05-09 23:19:40
20250523164012	2026-05-09 23:19:41
20250714121412	2026-05-09 23:19:42
20250905041441	2026-05-09 23:19:44
20251103001201	2026-05-09 23:19:45
20251120212548	2026-05-09 23:19:46
20251120215549	2026-05-09 23:19:47
20260218120000	2026-05-09 23:19:48
20260326120000	2026-05-09 23:19:50
20260514120000	2026-06-13 22:06:06
20260527120000	2026-06-13 22:06:06
20260528120000	2026-06-13 22:06:07
20260603120000	2026-06-13 22:06:07
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at, action_filter, selected_columns) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2026-05-09 18:31:55.60606
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2026-05-09 18:31:55.648001
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2026-05-09 18:31:55.66112
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2026-05-09 18:31:55.686778
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2026-05-09 18:31:55.705494
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2026-05-09 18:31:55.717398
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2026-05-09 18:31:55.729472
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2026-05-09 18:31:55.741671
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2026-05-09 18:31:55.753375
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2026-05-09 18:31:55.765752
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2026-05-09 18:31:55.77814
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2026-05-09 18:31:55.790642
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2026-05-09 18:31:55.805312
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2026-05-09 18:31:55.817326
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2026-05-09 18:31:55.829703
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2026-05-09 18:31:55.858894
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2026-05-09 18:31:55.870663
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2026-05-09 18:31:55.882462
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2026-05-09 18:31:55.894434
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2026-05-09 18:31:55.9076
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2026-05-09 18:31:55.91986
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2026-05-09 18:31:55.933089
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2026-05-09 18:31:55.95721
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2026-05-09 18:31:55.973759
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2026-05-09 18:31:55.985901
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2026-05-09 18:31:55.997606
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2026-05-09 18:31:56.009549
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2026-05-09 18:31:56.020759
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2026-05-09 18:31:56.031965
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2026-05-09 18:31:56.043018
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2026-05-09 18:31:56.054208
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2026-05-09 18:31:56.065582
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2026-05-09 18:31:56.07707
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2026-05-09 18:31:56.088496
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2026-05-09 18:31:56.099733
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2026-05-09 18:31:56.11102
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2026-05-09 18:31:56.122338
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2026-05-09 18:31:56.133662
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2026-05-09 18:31:56.146057
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2026-05-09 18:31:56.16392
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2026-05-09 18:31:56.175409
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2026-05-09 18:31:56.186878
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2026-05-09 18:31:56.198412
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2026-05-09 18:31:56.209731
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2026-05-09 18:31:56.221347
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2026-05-09 18:31:56.233725
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2026-05-09 18:31:56.253329
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2026-05-09 18:31:56.265654
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2026-05-09 18:31:56.278153
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2026-05-09 18:31:56.300314
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-05-09 18:31:56.312498
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-05-09 18:31:57.061192
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-05-09 18:31:57.06454
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-05-09 18:31:57.084323
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-05-09 18:31:57.09062
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-05-09 18:31:57.093895
56	fix-optimized-search-function	b823ed1e418101032fa01374edc9a436e54e3ed4	2026-05-09 18:31:57.106326
57	s3-multipart-uploads-metadata	f127886e00d1b374fadbc7c6b31e09336aad5287	2026-05-09 18:31:57.120283
58	operation-ergonomics	00ca5d483b3fe0d522133d9002ccc5df98365120	2026-05-09 18:31:57.132012
59	drop-unused-functions	38456f13e39691c2bbb4b5151d0d1cdbabd4a8c4	2026-05-09 18:31:57.144702
60	optimize-existing-functions-again	db35e1c91a9201e59f4fef8d972c2f277d68b157	2026-05-09 18:31:57.157336
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata, metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: delivery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.delivery_id_seq', 50, true);


--
-- Name: despesas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.despesas_id_seq', 26, true);


--
-- Name: fornecedores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.fornecedores_id_seq', 19, true);


--
-- Name: itens_venda_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.itens_venda_id_seq', 481, true);


--
-- Name: movimentacoes_produtos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movimentacoes_produtos_id_seq', 1, true);


--
-- Name: vendas_numero_venda_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vendas_numero_venda_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: custom_oauth_providers custom_oauth_providers_identifier_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_identifier_key UNIQUE (identifier);


--
-- Name: custom_oauth_providers custom_oauth_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_client_states
    ADD CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: webauthn_challenges webauthn_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_pkey PRIMARY KEY (id);


--
-- Name: webauthn_credentials webauthn_credentials_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_pkey PRIMARY KEY (id);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- Name: delivery delivery_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery
    ADD CONSTRAINT delivery_pkey PRIMARY KEY (id);


--
-- Name: despesas despesas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.despesas
    ADD CONSTRAINT despesas_pkey PRIMARY KEY (id);


--
-- Name: fornecedores fornecedores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fornecedores
    ADD CONSTRAINT fornecedores_pkey PRIMARY KEY (id);


--
-- Name: itens_venda itens_venda_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_venda
    ADD CONSTRAINT itens_venda_pkey PRIMARY KEY (id);


--
-- Name: movimentacoes_produtos movimentacoes_produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movimentacoes_produtos
    ADD CONSTRAINT movimentacoes_produtos_pkey PRIMARY KEY (id);


--
-- Name: pagamentos pagamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_pkey PRIMARY KEY (id);


--
-- Name: pedidos_fornecedor_grupos pedidos_fornecedor_grupos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedidos_fornecedor_grupos
    ADD CONSTRAINT pedidos_fornecedor_grupos_pkey PRIMARY KEY (id);


--
-- Name: pedidos_fornecedor pedidos_fornecedor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedidos_fornecedor
    ADD CONSTRAINT pedidos_fornecedor_pkey PRIMARY KEY (id);


--
-- Name: pendencias pendencias_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pendencias
    ADD CONSTRAINT pendencias_pkey PRIMARY KEY (id);


--
-- Name: prevendas prevendas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prevendas
    ADD CONSTRAINT prevendas_pkey PRIMARY KEY (id);


--
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id);


--
-- Name: roteiro_vendas roteiro_vendas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roteiro_vendas
    ADD CONSTRAINT roteiro_vendas_pkey PRIMARY KEY (id);


--
-- Name: roteiro_vendas_v2 roteiro_vendas_v2_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roteiro_vendas_v2
    ADD CONSTRAINT roteiro_vendas_v2_pkey PRIMARY KEY (id);


--
-- Name: taxas taxas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.taxas
    ADD CONSTRAINT taxas_pkey PRIMARY KEY (id);


--
-- Name: vendas vendas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendas
    ADD CONSTRAINT vendas_pkey PRIMARY KEY (id);


--
-- Name: messages messages_payload_exclusive; Type: CHECK CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE realtime.messages
    ADD CONSTRAINT messages_payload_exclusive CHECK (((payload IS NULL) OR (binary_payload IS NULL))) NOT VALID;


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: custom_oauth_providers_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_created_at_idx ON auth.custom_oauth_providers USING btree (created_at);


--
-- Name: custom_oauth_providers_enabled_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_enabled_idx ON auth.custom_oauth_providers USING btree (enabled);


--
-- Name: custom_oauth_providers_identifier_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_identifier_idx ON auth.custom_oauth_providers USING btree (identifier);


--
-- Name: custom_oauth_providers_provider_type_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_provider_type_idx ON auth.custom_oauth_providers USING btree (provider_type);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_oauth_client_states_created_at ON auth.oauth_client_states USING btree (created_at);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: idx_users_created_at_desc; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_users_created_at_desc ON auth.users USING btree (created_at DESC);


--
-- Name: idx_users_email; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_users_email ON auth.users USING btree (email);


--
-- Name: idx_users_last_sign_in_at_desc; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_users_last_sign_in_at_desc ON auth.users USING btree (last_sign_in_at DESC);


--
-- Name: idx_users_name; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_users_name ON auth.users USING btree (((raw_user_meta_data ->> 'name'::text))) WHERE ((raw_user_meta_data ->> 'name'::text) IS NOT NULL);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: webauthn_challenges_expires_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX webauthn_challenges_expires_at_idx ON auth.webauthn_challenges USING btree (expires_at);


--
-- Name: webauthn_challenges_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX webauthn_challenges_user_id_idx ON auth.webauthn_challenges USING btree (user_id);


--
-- Name: webauthn_credentials_credential_id_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX webauthn_credentials_credential_id_key ON auth.webauthn_credentials USING btree (credential_id);


--
-- Name: webauthn_credentials_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX webauthn_credentials_user_id_idx ON auth.webauthn_credentials USING btree (user_id);


--
-- Name: idx_pendencias_cliente_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pendencias_cliente_id ON public.pendencias USING btree (cliente_id);


--
-- Name: idx_pendencias_origem; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pendencias_origem ON public.pendencias USING btree (origem);


--
-- Name: idx_prevendas_cliente; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prevendas_cliente ON public.prevendas USING btree (cliente_nome);


--
-- Name: idx_prevendas_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prevendas_created_at ON public.prevendas USING btree (created_at DESC);


--
-- Name: idx_prevendas_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prevendas_status ON public.prevendas USING btree (status);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_action_filter_selec; Type: INDEX; Schema: realtime; Owner: -
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_action_filter_selec ON realtime.subscription USING btree (subscription_id, entity, filters, action_filter, COALESCE(selected_columns, '{}'::text[]));


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX idx_objects_bucket_id_name_lower ON storage.objects USING btree (bucket_id, lower(name) COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: -
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER protect_buckets_delete BEFORE DELETE ON storage.buckets FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER protect_objects_delete BEFORE DELETE ON storage.objects FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: webauthn_challenges webauthn_challenges_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: webauthn_credentials webauthn_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: delivery delivery_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery
    ADD CONSTRAINT delivery_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id);


--
-- Name: delivery delivery_venda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery
    ADD CONSTRAINT delivery_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id) ON DELETE CASCADE;


--
-- Name: itens_venda itens_venda_fornecedor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_venda
    ADD CONSTRAINT itens_venda_fornecedor_id_fkey FOREIGN KEY (fornecedor_id) REFERENCES public.fornecedores(id);


--
-- Name: itens_venda itens_venda_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_venda
    ADD CONSTRAINT itens_venda_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id);


--
-- Name: itens_venda itens_venda_venda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_venda
    ADD CONSTRAINT itens_venda_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id) ON DELETE CASCADE;


--
-- Name: movimentacoes_produtos movimentacoes_produtos_fornecedor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movimentacoes_produtos
    ADD CONSTRAINT movimentacoes_produtos_fornecedor_id_fkey FOREIGN KEY (fornecedor_id) REFERENCES public.fornecedores(id);


--
-- Name: movimentacoes_produtos movimentacoes_produtos_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movimentacoes_produtos
    ADD CONSTRAINT movimentacoes_produtos_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id);


--
-- Name: movimentacoes_produtos movimentacoes_produtos_venda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movimentacoes_produtos
    ADD CONSTRAINT movimentacoes_produtos_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id);


--
-- Name: pagamentos pagamentos_venda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pagamentos
    ADD CONSTRAINT pagamentos_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id) ON DELETE CASCADE;


--
-- Name: pedidos_fornecedor pedidos_fornecedor_grupo_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedidos_fornecedor
    ADD CONSTRAINT pedidos_fornecedor_grupo_fk FOREIGN KEY (pedido_grupo_id) REFERENCES public.pedidos_fornecedor_grupos(id) ON DELETE SET NULL;


--
-- Name: pedidos_fornecedor pedidos_fornecedor_produto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedidos_fornecedor
    ADD CONSTRAINT pedidos_fornecedor_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id) ON DELETE CASCADE;


--
-- Name: pendencias pendencias_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pendencias
    ADD CONSTRAINT pendencias_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON DELETE SET NULL;


--
-- Name: pendencias pendencias_venda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pendencias
    ADD CONSTRAINT pendencias_venda_id_fkey FOREIGN KEY (venda_id) REFERENCES public.vendas(id) ON DELETE CASCADE;


--
-- Name: produtos produtos_fornecedor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_fornecedor_id_fkey FOREIGN KEY (fornecedor_id) REFERENCES public.fornecedores(id);


--
-- Name: vendas vendas_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vendas
    ADD CONSTRAINT vendas_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id);


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: pedidos_fornecedor Permitir acesso total pedidos fornecedor; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir acesso total pedidos fornecedor" ON public.pedidos_fornecedor USING (true) WITH CHECK (true);


--
-- Name: pedidos_fornecedor_grupos Permitir acesso total pedidos fornecedor grupos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir acesso total pedidos fornecedor grupos" ON public.pedidos_fornecedor_grupos USING (true) WITH CHECK (true);


--
-- Name: roteiro_vendas Permitir acesso total roteiro vendas; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir acesso total roteiro vendas" ON public.roteiro_vendas USING (true) WITH CHECK (true);


--
-- Name: roteiro_vendas_v2 Permitir acesso total roteiro vendas v2; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir acesso total roteiro vendas v2" ON public.roteiro_vendas_v2 USING (true) WITH CHECK (true);


--
-- Name: clientes_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.clientes_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: delivery_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.delivery_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: despesas_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.despesas_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: fornecedores_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.fornecedores_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: itens_venda_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.itens_venda_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: movimentacoes_produtos; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.movimentacoes_produtos ENABLE ROW LEVEL SECURITY;

--
-- Name: pagamentos_backup; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pagamentos_backup ENABLE ROW LEVEL SECURITY;

--
-- Name: pagamentos_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pagamentos_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: pedidos_fornecedor; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pedidos_fornecedor ENABLE ROW LEVEL SECURITY;

--
-- Name: pedidos_fornecedor_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pedidos_fornecedor_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: pedidos_fornecedor_grupos; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pedidos_fornecedor_grupos ENABLE ROW LEVEL SECURITY;

--
-- Name: pendencias_backup; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pendencias_backup ENABLE ROW LEVEL SECURITY;

--
-- Name: pendencias_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pendencias_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: prevendas; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.prevendas ENABLE ROW LEVEL SECURITY;

--
-- Name: prevendas prevendas_delete; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY prevendas_delete ON public.prevendas FOR DELETE USING (true);


--
-- Name: prevendas prevendas_insert; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY prevendas_insert ON public.prevendas FOR INSERT WITH CHECK (true);


--
-- Name: prevendas prevendas_select; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY prevendas_select ON public.prevendas FOR SELECT USING (true);


--
-- Name: prevendas prevendas_update; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY prevendas_update ON public.prevendas FOR UPDATE USING (true) WITH CHECK (true);


--
-- Name: produtos_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.produtos_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: roteiro_vendas; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.roteiro_vendas ENABLE ROW LEVEL SECURITY;

--
-- Name: roteiro_vendas_v2; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.roteiro_vendas_v2 ENABLE ROW LEVEL SECURITY;

--
-- Name: taxas_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.taxas_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: vendas_backup; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.vendas_backup ENABLE ROW LEVEL SECURITY;

--
-- Name: vendas_backup_20260523; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.vendas_backup_20260523 ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: -
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: -
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


--
-- PostgreSQL database dump complete
--

\unrestrict VOS4K9abRt49UgxGGJLsfP4cHvXZbrx1glbmF1WTveS327T1oDjU5qSC7AfKEPj

