--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Homebrew)
-- Dumped by pg_dump version 16.8 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: file; Type: TABLE; Schema: public
--

CREATE TABLE public.file (
    file_id integer NOT NULL,
    project_id integer NOT NULL,
    file_name character varying(255) NOT NULL,
    date_uploaded date DEFAULT CURRENT_DATE NOT NULL,
    is_segmented boolean DEFAULT false NOT NULL
);

--
-- Name: file_file_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE public.file_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: file_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE public.file_file_id_seq OWNED BY public.file.file_id;

--
-- Name: project; Type: TABLE; Schema: public
--

CREATE TABLE public.project (
    project_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(1000),
    date date DEFAULT CURRENT_DATE NOT NULL
);

--
-- Name: project_member; Type: TABLE; Schema: public
--

CREATE TABLE public.project_member (
    projectmember_id integer NOT NULL,
    user_id integer NOT NULL,
    project_id integer NOT NULL
);

--
-- Name: project_member_projectmember_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE public.project_member_projectmember_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: project_member_projectmember_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE public.project_member_projectmember_id_seq OWNED BY public.project_member.projectmember_id;

--
-- Name: project_project_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE public.project_project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: project_project_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE public.project_project_id_seq OWNED BY public.project.project_id;

--
-- Name: users; Type: TABLE; Schema: public
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public.users.user_id;

--
-- Name: zfmapping; Type: TABLE; Schema: public
--

CREATE TABLE public.zfmapping (
    zfmapping_id integer NOT NULL,
    zone_id integer NOT NULL,
    file_id integer NOT NULL
);

--
-- Name: zfmapping_zfmapping_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE public.zfmapping_zfmapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: zfmapping_zfmapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE public.zfmapping_zfmapping_id_seq OWNED BY public.zfmapping.zfmapping_id;

--
-- Name: zone; Type: TABLE; Schema: public
--

CREATE TABLE public.zone (
    zone_id integer NOT NULL,
    name character varying(255) NOT NULL,
    latitude numeric(8,6) NOT NULL,
    longitude numeric(9,6) NOT NULL
);

--
-- Name: zone_zone_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE public.zone_zone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: zone_zone_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE public.zone_zone_id_seq OWNED BY public.zone.zone_id;

--
-- Name: file file_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY public.file ALTER COLUMN file_id SET DEFAULT nextval('public.file_file_id_seq'::regclass);

--
-- Name: project project_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY public.project ALTER COLUMN project_id SET DEFAULT nextval('public.project_project_id_seq'::regclass);

--
-- Name: project_member projectmember_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY public.project_member ALTER COLUMN projectmember_id SET DEFAULT nextval('public.project_member_projectmember_id_seq'::regclass);

--
-- Name: users user_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);

--
-- Name: zfmapping zfmapping_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY public.zfmapping ALTER COLUMN zfmapping_id SET DEFAULT nextval('public.zfmapping_zfmapping_id_seq'::regclass);

--
-- Name: zone zone_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY public.zone ALTER COLUMN zone_id SET DEFAULT nextval('public.zone_zone_id_seq'::regclass);

--
-- Name: file file_pkey; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT file_pkey PRIMARY KEY (file_id);

--
-- Name: project_member project_member_pkey; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.project_member
    ADD CONSTRAINT project_member_pkey PRIMARY KEY (projectmember_id);

--
-- Name: project_member project_member_user_id_project_id_key; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.project_member
    ADD CONSTRAINT project_member_user_id_project_id_key UNIQUE (user_id, project_id);

--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public


ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_email_key UNIQUE (email);

--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);

--
-- Name: zfmapping zfmapping_pkey; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.zfmapping
    ADD CONSTRAINT zfmapping_pkey PRIMARY KEY (zfmapping_id);

--
-- Name: zfmapping zfmapping_zone_id_file_id_key; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.zfmapping
    ADD CONSTRAINT zfmapping_zone_id_file_id_key UNIQUE (zone_id, file_id);

--
-- Name: zone zone_pkey; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.zone
    ADD CONSTRAINT zone_pkey PRIMARY KEY (zone_id);

--
-- Name: idx_file_project_id; Type: INDEX; Schema: public
--

CREATE INDEX idx_file_project_id ON public.file USING btree (project_id);

--
-- Name: idx_project_member_project_id; Type: INDEX; Schema: public
--

CREATE INDEX idx_project_member_project_id ON public.project_member USING btree (project_id);

--
-- Name: idx_project_member_user_id; Type: INDEX; Schema: public
--

CREATE INDEX idx_project_member_user_id ON public.project_member USING btree (user_id);

--
-- Name: idx_zfmapping_file_id; Type: INDEX; Schema: public
--

CREATE INDEX idx_zfmapping_file_id ON public.zfmapping USING btree (file_id);

--
-- Name: idx_zfmapping_zone_id; Type: INDEX; Schema: public
--

CREATE INDEX idx_zfmapping_zone_id ON public.zfmapping USING btree (zone_id);

--
-- Name: file file_project_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT file_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(project_id) ON DELETE CASCADE;

--
-- Name: project_member project_member_project_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.project_member
    ADD CONSTRAINT project_member_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project(project_id) ON DELETE CASCADE;

--
-- Name: project_member project_member_user_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.project_member
    ADD CONSTRAINT project_member_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

--
-- Name: zfmapping zfmapping_file_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.zfmapping
    ADD CONSTRAINT zfmapping_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file(file_id) ON DELETE CASCADE;

--
-- Name: zfmapping zfmapping_zone_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY public.zfmapping
    ADD CONSTRAINT zfmapping_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zone(zone_id) ON DELETE CASCADE;

--
-- PostgreSQL database dump complete
--
