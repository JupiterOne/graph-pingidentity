# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Ingest new entities
  - `pingidentity_account`
  - `pingidentity_application`
  - `pingidentity_role`
  - `pingidentity_user`
  - `pingidentity_group`
- Build new relationships
  - `pingidentity_account_has_application`
  - `pingidentity_account_has_group`
  - `pingidentity_account_has_role`
  - `pingidentity_account_has_user`
  - `pingidentity_application_assigned_role`
  - `pingidentity_user_assigned_role`
  - `pingidentity_group_has_group`
  - `pingidentity_group_has_user`
