import React, { useState, useContext } from 'react'
import style from "../styles/productPolicy.module.css"
import { ContextGlobal } from './utils/global.context'

const ProductPolicy = () => {

    const { state: { PoliticasPE } } = useContext(ContextGlobal)

    const filterPoliticas = (data, tipoPolitica) => {
        const politica = data.filter(item => item?.titulo === tipoPolitica)
        return politica;
    }

    const rules = filterPoliticas(PoliticasPE, "Norma");
    const securitys = filterPoliticas(PoliticasPE, "Salud y Seguridad");
    const cancellations = filterPoliticas(PoliticasPE, "Política de cancelación");

  return (
    <div className={style.container}>
        <h2>¿Qué tenés que saber</h2>
        <hr />
        <div className={style.policyGrid}>
            <div className={style.rulesGrid}>
                <p className={style.rulesTitle}>Normas de la casa</p>
                {
                    rules.map(rule => (
                        <p className={style.ruleP} key={rule.id}>{rule.detalle}</p>
                    ))
                }
            </div>
            <div className={style.securityGrid}>
                <p className={style.securityTitle}>Salud y seguridad</p>
                {
                    securitys.map(security => (
                        <p className={style.securityP} key={security.id}>{security.detalle}</p>
                    ))
                }
            </div>
            <div className={style.cancellationGrid}>
                <p className={style.cancellationTitle}>Política de cancelación</p>
                {
                    cancellations.map(cancellation => (
                        <p className={style.cancellationP} key={cancellation.id}>{cancellation.detalle}</p>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default ProductPolicy