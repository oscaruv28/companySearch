--
-- PostgreSQL database dump
--


-- Dumped from database version 17.7 (Debian 17.7-3.pgdg13+1)
-- Dumped by pg_dump version 17.7 (Debian 17.7-3.pgdg13+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: company; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.company (
    id uuid NOT NULL,
    nit character varying(255) NOT NULL,
    razon_social character varying(255),
    email character varying(255) NOT NULL,
    autoriza_celular boolean DEFAULT false NOT NULL,
    autoriza_email boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    tipo_identificacion text NOT NULL,
    primer_nombre character varying(255),
    segundo_nombre character varying(255),
    primer_apellido character varying(255),
    segundo_apellido character varying(255),
    celular character varying(255),
    is_blocked boolean DEFAULT false NOT NULL,
    CONSTRAINT company_tipo_identificacion_check CHECK ((tipo_identificacion = ANY (ARRAY['NIT'::text, 'CC'::text, 'CE'::text, 'IE'::text])))
);


ALTER TABLE public.company OWNER TO admin;

--
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_id_seq OWNER TO admin;

--
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- Name: company_registrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.company_registrations (
    id uuid NOT NULL,
    company_id uuid NOT NULL,
    registration_date timestamp with time zone NOT NULL
);


ALTER TABLE public.company_registrations OWNER TO admin;

--
-- Name: mikro_orm_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.mikro_orm_migrations (
    id integer NOT NULL,
    name character varying(255),
    executed_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.mikro_orm_migrations OWNER TO admin;

--
-- Name: mikro_orm_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.mikro_orm_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mikro_orm_migrations_id_seq OWNER TO admin;

--
-- Name: mikro_orm_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.mikro_orm_migrations_id_seq OWNED BY public.mikro_orm_migrations.id;


--
-- Name: mikro_orm_migrations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.mikro_orm_migrations ALTER COLUMN id SET DEFAULT nextval('public.mikro_orm_migrations_id_seq'::regclass);


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.company (id, nit, razon_social, email, autoriza_celular, autoriza_email, created_at, updated_at, tipo_identificacion, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, celular, is_blocked) FROM stdin;
abafed39-9475-4d1a-bd2c-2ac4b0f7a542	1144105949	RAZON SOCIAL OSCAR	dev@gmail.com	t	t	2026-02-19 21:22:31.356+00	2026-02-20 06:24:08.258+00	NIT					fsdghfdgsrsd	f
1e02e0c3-1415-4141-9f06-2b48e4b233f9	900674335	SOCIAL NETWORK	388484@gmail.com	t	t	2026-02-20 02:18:40.573+00	2026-02-20 06:11:28.261+00	NIT					321345566	t
553dadc8-14b2-4de3-b359-c080058086a9	444455555	Teleperformance4	5445567@gmail.com	t	t	2026-02-19 21:48:21.543+00	2026-02-19 21:48:21.543+00	IE	\N	\N	\N	\N	\N	t
5a23d509-c0b2-4377-b306-6bf82fb378b8	9393938	Teleperformance2	567@tp.com.co	t	t	2026-02-19 21:41:22.472+00	2026-02-20 06:22:03.879+00	CC	Leiton	Acosta	Reinaldo	Gutierrez	32211223	t
6b064d2f-fc81-4f86-8a17-c31c857e210e	900674336	TEST DATA2	guerrero.oscar@correounivalle.edu.co	f	f	2026-02-20 00:50:47.381+00	2026-02-20 00:50:47.381+00	NIT	\N	\N	\N	\N	\N	f
704ed78c-fb4b-4786-aa4f-fa7744af959d	811033098	Teleperformance3	dev@tp.com	f	f	2026-02-19 19:27:26.708+00	2026-02-19 19:27:26.708+00	NIT	string	\N	string	\N	\N	f
77583dc7-f940-4797-8e0f-f652d110f805	32924329	TEST DATA	oscar123@tp.com	f	f	2026-02-19 21:27:50.049+00	2026-02-19 21:27:50.049+00	CC	\N	\N	\N	\N	\N	f
d874adcb-fa41-47e9-af3d-b305457cd050	384858585	QA TEST	spcial@gmail.com	f	t	2026-02-20 01:04:40.603+00	2026-02-20 06:26:04.851+00	CC	Campo	Obligatori	No	Ignorar	322933933	f
\.


--
-- Data for Name: company_registrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.company_registrations (id, company_id, registration_date) FROM stdin;
d426bdcd-b663-428b-af6f-a49ca0e441d7	1e02e0c3-1415-4141-9f06-2b48e4b233f9	2026-02-20 06:11:28.245+00
cdba98b0-cbc4-438e-86af-b8d5eb20daf4	5a23d509-c0b2-4377-b306-6bf82fb378b8	2026-02-20 06:22:03.866+00
bf5661f3-6639-47e7-8c5e-e3c9027f3737	abafed39-9475-4d1a-bd2c-2ac4b0f7a542	2026-02-20 06:24:08.247+00
c7c3b0f2-aab7-4497-af00-db96ca81b489	d874adcb-fa41-47e9-af3d-b305457cd050	2026-02-20 06:26:04.85+00
\.


--
-- Data for Name: mikro_orm_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.mikro_orm_migrations (id, name, executed_at) FROM stdin;
\.


--
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.company_id_seq', 1, false);


--
-- Name: mikro_orm_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.mikro_orm_migrations_id_seq', 2, true);


--
-- Name: company company_email_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_email_unique UNIQUE (email);


--
-- Name: company company_nit_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_nit_unique UNIQUE (nit);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: company_registrations company_registrations_company_id_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company_registrations
    ADD CONSTRAINT company_registrations_company_id_unique UNIQUE (company_id);


--
-- Name: company_registrations company_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company_registrations
    ADD CONSTRAINT company_registrations_pkey PRIMARY KEY (id);


--
-- Name: mikro_orm_migrations mikro_orm_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.mikro_orm_migrations
    ADD CONSTRAINT mikro_orm_migrations_pkey PRIMARY KEY (id);


--
-- Name: company_registrations company_registrations_company_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company_registrations
    ADD CONSTRAINT company_registrations_company_id_foreign FOREIGN KEY (company_id) REFERENCES public.company(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


