# Honey Chain Mobile

> Beekeeper mobile application for Honey Chain — an AI + IoT + Blockchain platform for smart beekeeping and trusted honey traceability.

[![Expo](https://img.shields.io/badge/Expo-57-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?style=flat-square&logo=react&logoColor=111827)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/NativeWind-4-38BDF8?style=flat-square)](https://www.nativewind.dev/)
[![Status](https://img.shields.io/badge/status-active%20development-D89A24?style=flat-square)]()

---

## Overview

Honey Chain Mobile is the **beekeeper-facing mobile application** of the Honey Chain ecosystem.

It provides beekeepers with a single interface to:

- Monitor registered hives
- View real-time hive telemetry
- Review AI-generated hive health insights
- Monitor alerts
- Manage honey batches
- Access digital batch identity and QR verification
- Track hive and honey-related activity

The application communicates with the Honey Chain backend API, which acts as the source of truth for authentication, hive data, telemetry, AI predictions, alerts and batch records.

---

## Product Vision

Honey Chain connects the physical hive with the digital honey supply chain.

```text
Smart Hive
    │
    ▼
IoT Telemetry
    │
    ▼
Honey Chain Backend
    │
    ├── Hive Monitoring
    ├── AI Analysis
    ├── Alerts
    ├── Harvests
    └── Honey Batches
            │
            ▼
       Digital Identity
            │
            ▼
        QR Verification

```