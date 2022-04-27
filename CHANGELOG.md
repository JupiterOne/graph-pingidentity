# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.0.0 - 2022-04-27

### Added

- Ingest new entities
  - `pingone_account`
  - `pingone_application`
  - `pingone_role`
  - `pingone_user`
  - `pingone_group`

- Build new relationships
  - `pingone_account_has_application`
  - `pingone_account_has_group`
  - `pingone_account_has_role`
  - `pingone_account_has_user`
  - `pingone_application_assigned_role`
  - `pingone_user_assigned_role`
  - `pingone_group_has_group`
  - `pingone_group_has_user`
