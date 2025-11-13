package org.example.tishoo.domain.payment.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.tishoo.domain.payment.dto.ConfirmPaymentRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class TossPaymentClient {

    private final ObjectMapper objectMapper;

    @Value("${toss.payments.secret-key}")
    private String secretKey;

    private String getAuthorizations() {
        String auth = secretKey + ":";
        String encoded = Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8));
        return "Basic " + encoded;
    }

    /**
     * 토스에게 결제 승인 요청
     */
    public HttpResponse<String> requestConfirm(ConfirmPaymentRequest confirmPaymentRequest)
            throws IOException, InterruptedException {

        String tossOrderId = confirmPaymentRequest.orderId();
        String amount = confirmPaymentRequest.amount();
        String tossPaymentKey = confirmPaymentRequest.paymentKey();

        JsonNode requestObj = objectMapper.createObjectNode()
                .put("orderId", tossOrderId)
                .put("amount", amount)
                .put("paymentKey", tossPaymentKey);

        String requestBody = objectMapper.writeValueAsString(requestObj);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.tosspayments.com/v1/payments/confirm"))
                .header("Authorization", getAuthorizations())
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        return HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
    }

    /**
     * 결제 취소 요청
     */
    public HttpResponse<String> requestPaymentCancel(String paymentKey, String cancelReason)
            throws IOException, InterruptedException {

        String requestBody = "{\"cancelReason\":\"" + cancelReason + "\"}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.tosspayments.com/v1/payments/" + paymentKey + "/cancel"))
                .header("Authorization", getAuthorizations())
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        return HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
    }
}