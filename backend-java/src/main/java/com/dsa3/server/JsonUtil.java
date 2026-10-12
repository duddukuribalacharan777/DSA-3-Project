package com.dsa3.server;

import java.lang.reflect.Method;
import java.util.*;

/**
 * Lightweight, zero-dependency JSON serializer and parser.
 * Enables running pure Java without external JAR requirements.
 */
public class JsonUtil {

    public static String toJson(Object obj) {
        if (obj == null) return "null";

        if (obj instanceof String) {
            return "\"" + escapeJson((String) obj) + "\"";
        }
        if (obj instanceof Number || obj instanceof Boolean) {
            return obj.toString();
        }
        if (obj instanceof Map<?, ?>) {
            Map<?, ?> map = (Map<?, ?>) obj;
            StringBuilder sb = new StringBuilder("{");
            boolean first = true;
            for (Map.Entry<?, ?> entry : map.entrySet()) {
                if (!first) sb.append(",");
                first = false;
                sb.append("\"").append(escapeJson(String.valueOf(entry.getKey()))).append("\":");
                sb.append(toJson(entry.getValue()));
            }
            sb.append("}");
            return sb.toString();
        }
        if (obj instanceof Collection<?>) {
            Collection<?> col = (Collection<?>) obj;
            StringBuilder sb = new StringBuilder("[");
            boolean first = true;
            for (Object item : col) {
                if (!first) sb.append(",");
                first = false;
                sb.append(toJson(item));
            }
            sb.append("]");
            return sb.toString();
        }
        if (obj.getClass().isArray()) {
            StringBuilder sb = new StringBuilder("[");
            int len = java.lang.reflect.Array.getLength(obj);
            for (int i = 0; i < len; i++) {
                if (i > 0) sb.append(",");
                sb.append(toJson(java.lang.reflect.Array.get(obj, i)));
            }
            sb.append("]");
            return sb.toString();
        }

        // POJO via reflection getters
        StringBuilder sb = new StringBuilder("{");
        boolean first = true;
        for (Method m : obj.getClass().getMethods()) {
            if (m.getParameterCount() == 0 && !m.getName().equals("getClass") &&
                (m.getName().startsWith("get") || m.getName().startsWith("is"))) {
                String propName;
                if (m.getName().startsWith("get")) {
                    propName = m.getName().substring(3);
                } else {
                    propName = m.getName().substring(2);
                }
                if (!propName.isEmpty()) {
                    propName = Character.toLowerCase(propName.charAt(0)) + propName.substring(1);
                    try {
                        Object val = m.invoke(obj);
                        if (!first) sb.append(",");
                        first = false;
                        sb.append("\"").append(propName).append("\":").append(toJson(val));
                    } catch (Exception ignored) {}
                }
            }
        }
        sb.append("}");
        return sb.toString();
    }

    public static String escapeJson(String s) {
        if (s == null) return "";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            switch (ch) {
                case '"': sb.append("\\\""); break;
                case '\\': sb.append("\\\\"); break;
                case '\b': sb.append("\\b"); break;
                case '\f': sb.append("\\f"); break;
                case '\n': sb.append("\\n"); break;
                case '\r': sb.append("\\r"); break;
                case '\t': sb.append("\\t"); break;
                default:
                    if (ch < 32) {
                        sb.append(String.format("\\u%04x", (int) ch));
                    } else {
                        sb.append(ch);
                    }
            }
        }
        return sb.toString();
    }

    /**
     * Parses a JSON string representing an array of objects: [ {...}, {...} ]
     */
    public static List<Map<String, Object>> parseJsonArray(String json) {
        List<Map<String, Object>> list = new ArrayList<>();
        if (json == null) return list;
        json = json.trim();
        if (!json.startsWith("[") || !json.endsWith("]")) return list;
        json = json.substring(1, json.length() - 1).trim();
        if (json.isEmpty()) return list;

        int len = json.length();
        int i = 0;
        while (i < len) {
            while (i < len && (Character.isWhitespace(json.charAt(i)) || json.charAt(i) == ',')) i++;
            if (i >= len) break;

            if (json.charAt(i) == '{') {
                int start = i;
                int depth = 0;
                boolean inStr = false;
                boolean escape = false;
                while (i < len) {
                    char c = json.charAt(i);
                    if (escape) {
                        escape = false;
                    } else if (c == '\\') {
                        escape = true;
                    } else if (c == '"') {
                        inStr = !inStr;
                    } else if (!inStr) {
                        if (c == '{') depth++;
                        else if (c == '}') {
                            depth--;
                            if (depth == 0) {
                                i++;
                                break;
                            }
                        }
                    }
                    i++;
                }
                String objStr = json.substring(start, i);
                list.add(parseJsonObject(objStr));
            } else {
                i++;
            }
        }
        return list;
    }

    /**
     * Simple JSON parser for flat/nested string and number key-value maps.
     */
    public static Map<String, Object> parseJsonObject(String json) {
        Map<String, Object> result = new LinkedHashMap<>();
        if (json == null) return result;
        json = json.trim();
        if (json.startsWith("{") && json.endsWith("}")) {
            json = json.substring(1, json.length() - 1).trim();
        }
        if (json.isEmpty()) return result;

        int len = json.length();
        int i = 0;

        while (i < len) {
            // Find key
            while (i < len && (Character.isWhitespace(json.charAt(i)) || json.charAt(i) == ',')) i++;
            if (i >= len) break;

            if (json.charAt(i) != '"') break;
            i++; // skip quote
            int keyStart = i;
            while (i < len && json.charAt(i) != '"') {
                if (json.charAt(i) == '\\') i++;
                i++;
            }
            String key = json.substring(keyStart, i);
            i++; // skip closing quote

            while (i < len && (Character.isWhitespace(json.charAt(i)) || json.charAt(i) == ':')) i++;

            // Value
            if (i >= len) break;
            char valChar = json.charAt(i);
            if (valChar == '"') {
                i++;
                StringBuilder sb = new StringBuilder();
                while (i < len && json.charAt(i) != '"') {
                    if (json.charAt(i) == '\\' && i + 1 < len) {
                        char next = json.charAt(i + 1);
                        if (next == '"' || next == '\\' || next == '/') sb.append(next);
                        else if (next == 'n') sb.append('\n');
                        else if (next == 'r') sb.append('\r');
                        else if (next == 't') sb.append('\t');
                        i += 2;
                    } else {
                        sb.append(json.charAt(i));
                        i++;
                    }
                }
                i++; // skip closing quote
                result.put(key, sb.toString());
            } else if (valChar == '{') {
                int depth = 1;
                int startObj = i;
                i++;
                while (i < len && depth > 0) {
                    if (json.charAt(i) == '{') depth++;
                    else if (json.charAt(i) == '}') depth--;
                    i++;
                }
                result.put(key, parseJsonObject(json.substring(startObj, i)));
            } else if (valChar == '[') {
                int depth = 1;
                int startArr = i;
                i++;
                while (i < len && depth > 0) {
                    if (json.charAt(i) == '[') depth++;
                    else if (json.charAt(i) == ']') depth--;
                    i++;
                }
                result.put(key, json.substring(startArr, i));
            } else {
                int startVal = i;
                while (i < len && json.charAt(i) != ',' && json.charAt(i) != '}') {
                    i++;
                }
                String literal = json.substring(startVal, i).trim();
                if ("true".equalsIgnoreCase(literal)) {
                    result.put(key, Boolean.TRUE);
                } else if ("false".equalsIgnoreCase(literal)) {
                    result.put(key, Boolean.FALSE);
                } else if ("null".equalsIgnoreCase(literal)) {
                    result.put(key, null);
                } else {
                    try {
                        if (literal.contains(".")) {
                            result.put(key, Double.parseDouble(literal));
                        } else {
                            result.put(key, Integer.parseInt(literal));
                        }
                    } catch (NumberFormatException e) {
                        result.put(key, literal);
                    }
                }
            }

            while (i < len && (Character.isWhitespace(json.charAt(i)) || json.charAt(i) == ',')) i++;
        }

        return result;
    }
}
