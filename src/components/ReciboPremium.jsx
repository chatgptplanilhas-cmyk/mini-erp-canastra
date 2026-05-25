import { forwardRef } from 'react'
import logoReciboPremium from '../assets/logo-recibo-premium.png'
import iconePix from '../assets/icone-pix.png'
import iconeCartao from '../assets/icone-cartao.png'
import iconeLink from '../assets/icone-link.png'
import iconeDinheiro from '../assets/icone-dinheiro.png'

const ReciboPremium = forwardRef(function ReciboPremium({ dados, moeda, dataBR }, ref) {
  const recibo = dados || {}
  const status = String(recibo.status || 'PAGO').toUpperCase()
  const parcial = status === 'PARCIAL'
  const forma = recibo.formaPagamento || 'Pix'

  function formatarMoeda(valor) {
    if (typeof moeda === 'function') return moeda(Number(valor || 0))
    return Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function formatarData(data) {
    if (!data) return ''
    if (typeof dataBR === 'function') return dataBR(data)
    const [ano, mes, dia] = String(data).slice(0, 10).split('-')
    return ano && mes && dia ? `${dia}/${mes}/${ano}` : String(data)
  }

  function tipoFormaPagamento() {
    const texto = String(forma).toLowerCase()
    if (texto.includes('crédito') || texto.includes('credito')) return 'credito'
    if (texto.includes('débito') || texto.includes('debito')) return 'debito'
    if (texto.includes('link')) return 'link'
    if (texto.includes('dinheiro')) return 'dinheiro'
    return 'pix'
  }

  function IconePagamento({ pequeno = false }) {
    const tipo = tipoFormaPagamento()
    const classe = pequeno ? 'recibo-payment-img pequeno' : 'recibo-payment-img'

    const mapa = {
      pix: { src: iconePix, alt: 'Pix', extra: 'pix' },
      credito: { src: iconeCartao, alt: 'Cartão de crédito', extra: 'cartao' },
      debito: { src: iconeCartao, alt: 'Cartão de débito', extra: 'cartao' },
      link: { src: iconeLink, alt: 'Link de pagamento', extra: 'link' },
      dinheiro: { src: iconeDinheiro, alt: 'Dinheiro', extra: 'dinheiro' },
    }

    const item = mapa[tipo] || mapa.pix
    return <img className={`${classe} ${item.extra}`} src={item.src} alt={item.alt} />
  }

  return (
    <div ref={ref} className="recibo-premium-card">
      <div className="recibo-premium-inner">
        <img src={logoReciboPremium} alt="Queijos Serra da Canastra" className="recibo-logo" />

        <div className="recibo-status-box">
          <div className="recibo-status-icon">{parcial ? '!' : '✓'}</div>
          <div>
            <p>Status</p>
            <h1>{parcial ? 'Pagamento parcial' : 'Pagamento confirmado'}</h1>
            <h2>via {forma}</h2>
          </div>
          <div className="recibo-card-icon"><IconePagamento /></div>
        </div>

        <div className="recibo-lines">
          <div className="recibo-line">
            <div className="recibo-line-icon">♙</div>
            <div>
              <p className="recibo-line-label">Cliente</p>
              <p className="recibo-line-value"><strong>{recibo.cliente || 'Cliente não informado'}</strong></p>
              {recibo.referencia && <p className="recibo-line-value">{recibo.referencia}</p>}
            </div>
          </div>

          <div className="recibo-line">
            <div className="recibo-line-icon">$</div>
            <div>
              <p className="recibo-line-label">Valor recebido</p>
              <p className="recibo-line-money">{formatarMoeda(recibo.valorPago)}</p>
            </div>
          </div>

          <div className="recibo-line">
            <div className="recibo-line-icon">▦</div>
            <div>
              <p className="recibo-line-label">Data do pagamento</p>
              <p className="recibo-line-value">{formatarData(recibo.dataPagamento)}</p>
            </div>
          </div>

          <div className="recibo-line">
            <div className="recibo-line-icon"><IconePagamento pequeno /></div>
            <div>
              <p className="recibo-line-label">Forma de pagamento</p>
              <p className="recibo-line-value">{forma}</p>
            </div>
          </div>

          {recibo.numeroVenda && (
            <div className="recibo-line">
              <div className="recibo-line-icon">#</div>
              <div>
                <p className="recibo-line-label">Nº da venda</p>
                <p className="recibo-line-value">#{recibo.numeroVenda}</p>
              </div>
            </div>
          )}
        </div>

        {parcial && (
          <div className="recibo-split">
            <div className="recibo-split-item">
              <div className="recibo-money-round">$</div>
              <div>
                <p className="recibo-split-label">Saldo restante</p>
                <p className="recibo-split-value">{formatarMoeda(recibo.saldoRestante)}</p>
              </div>
            </div>
            <div className="recibo-split-divider" />
            <div className="recibo-split-item">
              <div className="recibo-line-icon">▦</div>
              <div>
                <p className="recibo-split-label">Próximo pagamento</p>
                <p className="recibo-split-value dark">{formatarData(recibo.proximoPagamento)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="recibo-message">
          <div className="recibo-check-icon">✓</div>
          <div>
            <strong>{parcial ? 'Pagamento parcial registrado.' : 'Pagamento registrado com sucesso.'}</strong>
            <p>{parcial ? 'Saldo pendente atualizado.' : 'Compra quitada em nosso controle.'}</p>
          </div>
        </div>

        <div className="recibo-footer-sign">
          <div className="recibo-line-icon">♙</div>
          <div>
            <h3>Delber Vilaça</h3>
            <p>Queijos Serra da Canastra</p>
          </div>
        </div>

        <div className="recibo-footer-divider">◆</div>

        <div className="recibo-footer-info">
          <div><span>▧</span><span>Produtos artesanais da Serra da Canastra</span></div>
          <div><span>⌖</span><span>Canastra-MG &nbsp; ↔ &nbsp; Brasília-DF</span></div>
        </div>
      </div>

      <div className="recibo-wood-base" />
    </div>
  )
})

export default ReciboPremium
