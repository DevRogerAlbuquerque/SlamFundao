import QRCode from "qrcode-react";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import ReactInputMask from "react-input-mask";
import { useLocation, useOutletContext } from "react-router-dom";

export default function Pagamento() 
{
    const { itensCarrinho } = useOutletContext();
    const location = useLocation();
    const {formulario, carrinho} = location.state || {};
    const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 3 }
    const formatNumber = new Intl.NumberFormat('pt-BR', options);
    const [meioPagamentoSelecionado, setMeioPagamentoSelecionado] = useState(false);

    //const valorTotal = carrinho.reduce((total, item) => total + item.valor * item.quantidade, 0);

    const [gpay, setGpay] = useState(null);

    useEffect(() => {
      const loadGooglePay = () => {
        if (window.google) {
          const paymentsClient = new window.google.payments.api.PaymentsClient({
            environment: "TEST", // Mudar para "PRODUCTION" em produção
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

    const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPaymentStatus = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:5207/api/pagamento/${paymentId}`);
      const data = await response.json();
      let finalizado;

      if (data.status === "approved") {
        alert("Pagamento aprovado!");
        finalizado = true;
      } else if (data.Status === "pending") {
        console.log("Pagamento pendente...");
        finalizado = false;
      } else {
        console.error("Erro no pagamento:", data.StatusDetail);
      }

      return finalizado;
    } catch (error) {
      console.error("Erro ao consultar status do pagamento:", error);
    }
  };

  const [id, setId] = useState();
  

  const handlePayment = async () => {
    setMeioPagamentoSelecionado(true);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5207/api/pagamento", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" // ✅ Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({
          valor: 0.01,
          descricao: 'teste',
          meio: 0,
          email: 'slamfundao@gmail.com'
        })
      })

      const data = await response.json();

      setQrCode(data.qrCodeBase64);
      setId(data.id)
    } catch (error) {
      console.error("Erro ao gerar pagamento:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      const interval = setInterval(() => {
        checkPaymentStatus(id);
      }, 5000); // Verifica a cada 5 segundos
  
      return () => clearInterval(interval); // Para a checagem quando o componente desmonta
    }
  }, [id]);

    const handlePaymentGooglePay = () => {
        if (!gpay) return;
    
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
            merchantId: "12345678901234567890",
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
    
        gpay.loadPaymentData(paymentDataRequest)
          .then(paymentData => {
            console.log("Pagamento bem-sucedido", paymentData);
          })
          .catch(error => {
            console.error("Erro no pagamento", error);
          });
      };

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
      <Button size="lg" className="backgroundRoxo" onClick={handlePaymentGooglePay}>Cartão</Button>
      <Button size="lg" className="backgroundRoxo" onClick={handlePayment}>PIX</Button>
    </Col>
  </Row></>}
  {meioPagamentoSelecionado && (
    <Row className="d-flex flex-column align-items-center justify-content-center mt-3">
      <h3>Escaneie o QR Code para pagar:</h3>
      <img height={"350px"} className="img-fluid" src={`data:image/png;base64,${qrCode}`} alt="QR Code PIX" />
    </Row>
  )}
</Container>

            
        </>
    );
}
