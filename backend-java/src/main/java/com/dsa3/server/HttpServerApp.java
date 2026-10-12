package com.dsa3.server;

import com.dsa3.algorithm.KasaiLcpBuilder;
import com.dsa3.algorithm.LcpBinarySearch;
import com.dsa3.algorithm.SuffixArrayBuilder;
import com.dsa3.model.*;
import com.dsa3.service.SearchEngine;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.Executors;

/**
 * High-performance Java REST API Server for Suffix-Array Search Engine.
 * Built using JDK standard com.sun.net.httpserver.HttpServer.
 * Zero external JAR dependencies required.
 */
public class HttpServerApp {

    private static final int PORT = 8080;
    private static final long START_TIME = System.currentTimeMillis();
    private static final SearchEngine searchEngine = new SearchEngine();

    public static void main(String[] args) throws IOException {
        int port = PORT;
        if (args.length > 0) {
            try {
                port = Integer.parseInt(args[0]);
            } catch (NumberFormatException ignored) {}
        }

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor());

        // Register Handlers
        server.createContext("/api/health", new HealthHandler());
        server.createContext("/api/stats", new StatsHandler());
        server.createContext("/api/documents", new DocumentsHandler());
        server.createContext("/api/search", new SearchHandler());
        server.createContext("/api/index/suffix-array", new SuffixArrayHandler());
        server.createContext("/api/index/kasai-lcp", new KasaiLcpHandler());
        server.createContext("/api/index/simulate-search", new SimulateSearchHandler());

        server.start();

        System.out.println("==================================================================");
        System.out.println("  DSA-3 Academic Full-Text Search Engine (Course: 25CS2103E)");
        System.out.println("  Team 16 • Section 10 • Suffix-Array Index & Kasai LCP Backend");
        System.out.println("==================================================================");
        System.out.println("  * REST API Server running at: http://localhost:" + port + "/");
        System.out.println("  * Health Check:              http://localhost:" + port + "/api/health");
        System.out.println("  * Documents Endpoint:        http://localhost:" + port + "/api/documents");
        System.out.println("  * Search Endpoint:           http://localhost:" + port + "/api/search");
        System.out.println("  * Suffix Array API:          http://localhost:" + port + "/api/index/suffix-array");
        System.out.println("==================================================================");
    }

    private static void sendCors(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private static void sendResponse(HttpExchange exchange, int statusCode, String responseText) throws IOException {
        sendCors(exchange);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        byte[] bytes = responseText.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
            os.flush();
        }
    }

    private static String readRequestBody(HttpExchange exchange) throws IOException {
        InputStream is = exchange.getRequestBody();
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[4096];
        int n;
        while ((n = is.read(buf)) != -1) {
            bos.write(buf, 0, n);
        }
        return bos.toString(StandardCharsets.UTF_8);
    }

    // Handlers
    static class HealthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                sendCors(exchange);
                if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                    exchange.sendResponseHeaders(204, -1);
                    return;
                }

                Map<String, Object> resp = new LinkedHashMap<>();
                resp.put("status", "UP");
                resp.put("engine", "Java Suffix-Array & Kasai LCP Engine");
                resp.put("version", "2.0.0");
                resp.put("course", "DSA-3 (25CS2103E)");
                resp.put("team", "Team 16 • Section 10");
                resp.put("runtime", System.getProperty("java.version") + " (" + System.getProperty("java.vendor") + ")");
                resp.put("documentsCount", searchEngine.getDocuments().size());
                resp.put("totalChars", searchEngine.getTotalIndexedChars());
                resp.put("totalSuffixes", searchEngine.getTotalSuffixes());
                resp.put("uptimeMs", System.currentTimeMillis() - START_TIME);

                sendResponse(exchange, 200, JsonUtil.toJson(resp));
            } catch (Throwable t) {
                t.printStackTrace();
                sendResponse(exchange, 500, "{\"error\":" + JsonUtil.toJson(t.getMessage()) + "}");
            }
        }
    }

    static class StatsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                sendCors(exchange);
                if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                    exchange.sendResponseHeaders(204, -1);
                    return;
                }

                Map<String, Object> resp = new LinkedHashMap<>();
                resp.put("documentsCount", searchEngine.getDocuments().size());
                resp.put("totalIndexedChars", searchEngine.getTotalIndexedChars());
                resp.put("totalSuffixes", searchEngine.getTotalSuffixes());
                resp.put("suffixArrayMemoryBytes", searchEngine.getTotalIndexedChars() * 4);
                resp.put("lcpArrayMemoryBytes", searchEngine.getTotalIndexedChars() * 4);
                resp.put("totalIndexFootprintBytes", searchEngine.getTotalIndexedChars() * 8);
                Map<String, String> complexities = new LinkedHashMap<>();
                complexities.put("suffixArrayConstruction", "O(n log² n)");
                complexities.put("kasaiLcpConstruction", "O(n)");
                complexities.put("lcpAcceleratedSearch", "O(m + log n)");
                complexities.put("linearScanBaseline", "O(n * m)");
                resp.put("asymptoticComplexities", complexities);

                sendResponse(exchange, 200, JsonUtil.toJson(resp));
            } catch (Throwable t) {
                t.printStackTrace();
                sendResponse(exchange, 500, "{\"error\":" + JsonUtil.toJson(t.getMessage()) + "}");
            }
        }
    }

    static class DocumentsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                sendCors(exchange);
                String method = exchange.getRequestMethod().toUpperCase();
                String path = exchange.getRequestURI().getPath();

                if ("OPTIONS".equalsIgnoreCase(method)) {
                    exchange.sendResponseHeaders(204, -1);
                    return;
                }

                if ("GET".equals(method)) {
                    if (path.equals("/api/documents") || path.equals("/api/documents/")) {
                        sendResponse(exchange, 200, JsonUtil.toJson(searchEngine.getDocuments()));
                        return;
                    }
                    String id = path.substring("/api/documents/".length());
                    Document doc = searchEngine.getDocumentById(id);
                    if (doc != null) {
                        sendResponse(exchange, 200, JsonUtil.toJson(doc));
                    } else {
                        sendResponse(exchange, 404, "{\"error\": \"Document not found\"}");
                    }
                } else if ("POST".equals(method)) {
                    if (path.endsWith("/reset")) {
                        searchEngine.resetCorpus();
                        Map<String, Object> resp = new LinkedHashMap<>();
                        resp.put("message", "Corpus reset to initial 12 seed documents");
                        resp.put("documentsCount", searchEngine.getDocuments().size());
                        sendResponse(exchange, 200, JsonUtil.toJson(resp));
                        return;
                    }
                    if (path.endsWith("/reindex")) {
                        Map<String, Object> result = searchEngine.reindex();
                        sendResponse(exchange, 200, JsonUtil.toJson(result));
                        return;
                    }

                    String body = readRequestBody(exchange);
                    Map<String, Object> parsed = JsonUtil.parseJsonObject(body);
                    Document doc = new Document();
                    doc.setFilename((String) parsed.get("filename"));
                    doc.setTitle((String) parsed.get("title"));
                    doc.setAuthor((String) parsed.get("author"));
                    doc.setCategory((String) parsed.get("category"));
                    doc.setContent((String) parsed.get("content"));

                    Document created = searchEngine.addDocument(doc);
                    sendResponse(exchange, 201, JsonUtil.toJson(created));
                } else if ("DELETE".equals(method)) {
                    String id = path.substring("/api/documents/".length());
                    boolean removed = searchEngine.removeDocument(id);
                    if (removed) {
                        sendResponse(exchange, 200, "{\"success\": true, \"message\": \"Document removed\"}");
                    } else {
                        sendResponse(exchange, 404, "{\"error\": \"Document not found\"}");
                    }
                } else {
                    sendResponse(exchange, 405, "{\"error\": \"Method not allowed\"}");
                }
            } catch (Throwable t) {
                t.printStackTrace();
                sendResponse(exchange, 500, "{\"error\":" + JsonUtil.toJson(t.getMessage()) + "}");
            }
        }
    }

    static class SearchHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                sendCors(exchange);
                String method = exchange.getRequestMethod().toUpperCase();
                if ("OPTIONS".equalsIgnoreCase(method)) {
                    exchange.sendResponseHeaders(204, -1);
                    return;
                }

                if ("POST".equals(method)) {
                    String body = readRequestBody(exchange);
                    Map<String, Object> parsed = JsonUtil.parseJsonObject(body);

                    String query = parsed.get("query") instanceof String ? (String) parsed.get("query") : "";
                    String queryType = parsed.get("queryType") instanceof String ? (String) parsed.get("queryType") : "SUBSTRING";
                    boolean caseSensitive = Boolean.TRUE.equals(parsed.get("caseSensitive"));
                    int maxResults = parsed.get("maxResults") instanceof Number ? ((Number) parsed.get("maxResults")).intValue() : 25;

                    SearchResponse resp = searchEngine.search(query, queryType, caseSensitive, maxResults);
                    sendResponse(exchange, 200, JsonUtil.toJson(resp));
                } else if ("GET".equals(method)) {
                    String queryRaw = exchange.getRequestURI().getQuery();
                    String q = "";
                    String type = "SUBSTRING";
                    if (queryRaw != null) {
                        for (String param : queryRaw.split("&")) {
                            String[] pair = param.split("=");
                            if (pair.length == 2) {
                                if ("q".equals(pair[0]) || "query".equals(pair[0])) {
                                    q = java.net.URLDecoder.decode(pair[1], StandardCharsets.UTF_8);
                                } else if ("type".equals(pair[0])) {
                                    type = java.net.URLDecoder.decode(pair[1], StandardCharsets.UTF_8);
                                }
                            }
                        }
                    }
                    SearchResponse resp = searchEngine.search(q, type, false, 25);
                    sendResponse(exchange, 200, JsonUtil.toJson(resp));
                } else {
                    sendResponse(exchange, 405, "{\"error\": \"Method not allowed\"}");
                }
            } catch (Throwable t) {
                t.printStackTrace();
                sendResponse(exchange, 500, "{\"error\":" + JsonUtil.toJson(t.getMessage()) + "}");
            }
        }
    }

    static class SuffixArrayHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                sendCors(exchange);
                if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                    exchange.sendResponseHeaders(204, -1);
                    return;
                }

                String body = readRequestBody(exchange);
                Map<String, Object> parsed = JsonUtil.parseJsonObject(body);
                String text = parsed.get("text") instanceof String ? (String) parsed.get("text") : "banana";

                SuffixArrayResult result = SuffixArrayBuilder.build(text);
                sendResponse(exchange, 200, JsonUtil.toJson(result));
            } catch (Throwable t) {
                t.printStackTrace();
                sendResponse(exchange, 500, "{\"error\":" + JsonUtil.toJson(t.getMessage()) + "}");
            }
        }
    }

    static class KasaiLcpHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                sendCors(exchange);
                if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                    exchange.sendResponseHeaders(204, -1);
                    return;
                }

                String body = readRequestBody(exchange);
                Map<String, Object> parsed = JsonUtil.parseJsonObject(body);
                String text = parsed.get("text") instanceof String ? (String) parsed.get("text") : "banana";

                SuffixArrayResult sa = SuffixArrayBuilder.build(text);
                LcpArrayResult result = KasaiLcpBuilder.build(text, sa);
                sendResponse(exchange, 200, JsonUtil.toJson(result));
            } catch (Throwable t) {
                t.printStackTrace();
                sendResponse(exchange, 500, "{\"error\":" + JsonUtil.toJson(t.getMessage()) + "}");
            }
        }
    }

    static class SimulateSearchHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                sendCors(exchange);
                if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                    exchange.sendResponseHeaders(204, -1);
                    return;
                }

                String body = readRequestBody(exchange);
                Map<String, Object> parsed = JsonUtil.parseJsonObject(body);
                String text = parsed.get("text") instanceof String ? (String) parsed.get("text") : "banana";
                String query = parsed.get("query") instanceof String ? (String) parsed.get("query") : "an";

                SuffixArrayResult sa = SuffixArrayBuilder.build(text);
                LcpArrayResult lcp = KasaiLcpBuilder.build(text, sa);
                BinarySearchSimulationResult result = LcpBinarySearch.simulate(text, sa.getSuffixArray(), lcp.getRawLcp(), query);

                sendResponse(exchange, 200, JsonUtil.toJson(result));
            } catch (Throwable t) {
                t.printStackTrace();
                sendResponse(exchange, 500, "{\"error\":" + JsonUtil.toJson(t.getMessage()) + "}");
            }
        }
    }
}
