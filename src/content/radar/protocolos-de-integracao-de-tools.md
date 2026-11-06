---
title: Protocolos padronizados para tools
date: 2026-11-04
summary: >-
  Protocolos abertos, como o Model Context Protocol (MCP), propõem uma forma
  comum de expor tools e fontes de dados a diferentes assistentes e agentes.
type: conceito
tags: [tools, mcp, integracao]
example: true
---

## O conceito

Sem um padrão, cada assistente precisa de uma integração própria para cada sistema. Um protocolo de integração define um contrato comum: um servidor descreve as tools e os dados que oferece, e qualquer cliente compatível consegue descobri-los e usá-los.

## Por que importa

A ideia é a mesma de qualquer padrão de integração em software: reduzir acoplamento e retrabalho. Os cuidados também são os mesmos — permissões mínimas, revisão do que cada servidor expõe e atenção a conteúdo externo que pode conter instruções maliciosas.

## Como se conecta ao currículo

Parte dos conceitos do módulo **Tools** e dos riscos discutidos em **Segurança**.
