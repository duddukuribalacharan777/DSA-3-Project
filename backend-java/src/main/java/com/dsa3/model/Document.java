package com.dsa3.model;

/**
 * Model representing an indexed text document in the corpus.
 */
public class Document {
    private String id;
    private String filename;
    private String title;
    private String author;
    private String category;
    private String status;
    private String dateIndexed;
    private String content;

    public Document() {}

    public Document(String id, String filename, String title, String author, String category, String status, String dateIndexed, String content) {
        this.id = id;
        this.filename = filename;
        this.title = title;
        this.author = author;
        this.category = category;
        this.status = status;
        this.dateIndexed = dateIndexed;
        this.content = content;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDateIndexed() { return dateIndexed; }
    public void setDateIndexed(String dateIndexed) { this.dateIndexed = dateIndexed; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
