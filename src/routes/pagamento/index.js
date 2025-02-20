import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import logo from '../../imagens/logobanner.png';
import { useLocation, useOutletContext } from "react-router-dom";

export default function Pagamento() 
{
    const { itensCarrinho } = useOutletContext();
    const location = useLocation();
    const {formulario, carrinho} = location.state || {};
    const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 3 }
    const formatNumber = new Intl.NumberFormat('pt-BR', options);
    const [meioPagamentoSelecionado, setMeioPagamentoSelecionado] = useState(false);
/*
    const [gpay, setGpay] = useState(null);

    useEffect(() => {
      const loadGooglePay = () => {
        if (window.google) {
          const paymentsClient = new window.google.payments.api.PaymentsClient({
            environment: "PRODUCTION", // Mudar para "PRODUCTION" em produção
          });
  
          const paymentDataRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["VISA", "MASTERCARD"],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleMerchantId",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "12345678901234567890", // Substituir pelo Merchant ID real
              merchantName: "Minha Loja",
            },
            transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: "10.00",
              currencyCode: "BRL",
              countryCode: "BR",
            },
          };
  
          paymentsClient.isReadyToPay(paymentDataRequest).then(response => {
            if (response.result) {
              setGpay(paymentsClient);
            }
          });
        }
      };
  
      if (!window.google) {
        const script = document.createElement("script");
        script.src = "https://pay.google.com/gp/p/js/pay.js";
        script.async = true;
        script.onload = loadGooglePay;
        document.body.appendChild(script);
      } else {
        loadGooglePay();
      }

    }, []);
*/
    const [qrCode, setQrCode] = useState(null);
    const [textoQrCode, setTextoQrCode] = useState('');
    const [pagamentoFinalizado, setPagamentoFinalizado] = useState(false);

  const checkPaymentStatus = async (paymentId) => {
    try {
      const response = await fetch(`https://gatewaypagamentos.onrender.com/api/pagamento/${paymentId}`);
      const data = await response.json();

      if (data.status === "approved") {
        const urlGoogleApps = "https://script.google.com/macros/s/AKfycbzFRU1J-JhNtONoQKO3xlfsRqV7s6SI2-uG8UO2xVxerxpKeN70wKiRe_Zstzjq_NLD8w/exec";
        
          fetch(urlGoogleApps, {
            method: "POST",
            body: new URLSearchParams({...formulario, ...{
              pedido: carrinho.map(item => `${item.quantidade}x ${item.nome} ${item.tamanho}`).join(", "),
              valor: carrinho.reduce((total, item) => total + item.valor * item.quantidade, 0)
            }}),
          });

          setPagamentoFinalizado(true);
      }
    } catch (error) {
      console.error("Erro ao consultar status do pagamento:", error);
    }
  };

  const [id, setId] = useState();
  
  const realizarPagamento = (body) => 
    fetch("https://gatewaypagamentos.onrender.com/api/pagamento", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...{
        valor: 0.01, //carrinho.reduce((total, item) => total + item.valor * item.quantidade, 0),
        descricao: carrinho.map(item => `${item.nome} - ${item.quantidade}, - ${item.tamanho}`).join(", "),
        email: formulario.email
      }, ...body})
    })
  


  const handlePayment = async () => {
    setMeioPagamentoSelecionado(true);
    try {
      const response = await realizarPagamento({
          meio: 0
        });

      const data = await response.json();

      setTextoQrCode(data.qrCode);
      setQrCode(data.qrCodeBase64);
      setId(data.id)
    } catch (error) {
      console.error("Erro ao gerar pagamento:", error);
    }
  };

  useEffect(() => {
    if (id && !pagamentoFinalizado) {
      const interval = setInterval(() => {
        checkPaymentStatus(id);
      }, 5000);
  
      return () => clearInterval(interval); 
    }
  }, [id, pagamentoFinalizado]);

  /*const handlePaymentGooglePay = () => {
      if (!gpay) return;

      const paymentDataRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
              {
                  type: "CARD",
                  parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["VISA", "MASTERCARD", "AMEX", "ELO"],
                  },
                  tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                          gateway: "mercadopago"
                      },
                  },
              },
          ],
          merchantInfo: {
              merchantId: "BCR2DN4TX7A5P7TZ",
              merchantName: "Slam Fundão",
          },
          transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: carrinho.reduce((total, item) => total + item.valor * item.quantidade, 0),
              currencyCode: "BRL",
              countryCode: "BR",
          },
      };

      gpay.loadPaymentData(paymentDataRequest)
          .then(async paymentData => {
              console.log("Pagamento bem-sucedido", paymentData);
              const response = await realizarPagamento({
                  meio: "google_pay",
                  googlePayToken: paymentData.paymentMethodData.tokenizationData.token
              });

              const data = response.json();

              setId(data.id);
          })
          .catch(error => {
              console.error("Erro no pagamento", error);
          });
  };*/
    return (
        <>
          <Container 
            fluid 
            className="d-flex flex-column align-items-center justify-content-center vh-100"
          >
          {!meioPagamentoSelecionado &&<><Row>
              <Col md={12} className="d-flex flex-column align-items-center justify-content-center">
                <h1 className="roxo">ESCOLHA A FORMA DE PAGAMENTO</h1>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="d-flex align-items-center justify-content-center gap-3">
                {//<Button size="lg" className="backgroundRoxo" onClick={handlePaymentGooglePay}>Cartão</Button>
                }
                <Button size="lg" className="backgroundRoxo" onClick={handlePayment}>PIX</Button>
              </Col>
            </Row></>}
            {meioPagamentoSelecionado && (
            <Row className="d-flex flex-column align-items-center justify-content-center mt-3">
              {!pagamentoFinalizado && 
                <>
                  <h3 className="roxo">Escaneie o QR Code para pagar:</h3>
                  {qrCode ? (
                    <img 
                      style={{ height: '350px', border: '15px solid #4E2759', borderRadius: '5%' }} 
                      height="350px" 
                      className="img-fluid" 
                      src={`data:image/png;base64,${qrCode}`} 
                      alt="QR Code PIX" 
                    />
                  ) : (
                    <div 
                      style={{ 
                        height: '350px', 
                        width: '350px', 
                        backgroundColor: '#ddd', 
                        border: '15px solid #4E2759', 
                        borderRadius: '5%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <span className="text-muted">Carregando...</span>
                    </div>
                  )}
              <Button 
                onClick={() => 
                  navigator.clipboard.writeText(textoQrCode)
                    .then(() => alert("Código PIX copiado!"))
                    .catch((err) => console.error("Erro ao copiar:", err))
                } 
                size="sm" 
                className="backgroundAmarelo bordaRoxa"
                disabled={!textoQrCode}
              >
                Copia e cola
              </Button>
              </>}
              {pagamentoFinalizado && 
                <>
                  <Col className="d-flex flex-column align-items-center justify-content-center mb-3" sm={12}><img src={logo} style={{width: '30%'}} /></Col>
                  <Col sm={12}><h1 className="roxo d-flex flex-column align-items-center justify-content-center"><FaCheckCircle /></h1></Col>
                  <Col sm={12}><h3 className="roxo d-flex flex-column align-items-center justify-content-center">Boa, {formulario.nome}! Seu pagamento foi realizado com sucesso!</h3></Col>
                  <Col sm={12}><h5 className="roxo d-flex flex-column align-items-center justify-content-center">Agora é só aguardar, que o Slam Fundão irá criar seus produtos e logo entraremos em contato!</h5></Col>
                </>}
            </Row>
          )}

          </Container>

            
        </>
    );
}
