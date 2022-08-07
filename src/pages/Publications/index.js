import React, {useEffect, useCallback, useState} from 'react';
import CustomLayout from "../../components/CustomLayout";
import {Box} from "rebass";
import {parseBibFile, normalizeFieldValue} from "bibtex";
import styles from "./index.module.css";
import clsx from "clsx";



const Highlighted = ({ text = "", highlight = "" }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.filter(String).map((part, i) => {
        return regex.test(part) ? (
          <mark key={i}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
};

function PublicationEntry({entry}) {
    const {title, year, journal, authors} = entry;

    return (
        <div className={clsx(styles.pub_item)}>
            <h4>{title}</h4>
            <p>{year}, {journal}</p>
            <p>{authors}</p>
            {/*<Highlighted
              text={authors}
              highlight="Ruiz-Guzman, Henry Alonso"
            />*/}
        </div>
    );
}

const PublicationsList = (props) => {

    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)

    const readFile = useCallback(async (file) => {
        try {
            const res = await fetch(file)
            return res.text()
        }
        catch (e) {
            console.error(e)
        }
    },[]);

    useEffect(() => {
        setLoading(true)
        readFile("citations.bibtex")
            .then(res => {
                const bibFile = parseBibFile(res)
                let entries = Object.keys(bibFile.entries$).map(key => {
                    const entry = bibFile.getEntry(key);
                    const title = normalizeFieldValue(entry.getField("TITLE"));
                    const year = normalizeFieldValue(entry.getField("year"));
                    let journal = normalizeFieldValue(entry.getField("journal"));
                    let isArticle = journal !== undefined;
                    journal = journal ? journal : normalizeFieldValue(entry.getField("booktitle"));
                    const authors = normalizeFieldValue(entry.getField("author"));
                    return {title, year, journal, authors, isArticle}
                })
                setEntries(entries)
                setLoading(false)
            }).catch(e => {
                console.error(e)
                setLoading(false)
            });
    },[readFile])

    const renderEntries = useCallback((entries) => {
      return entries.map((entry, index) => (
              <PublicationEntry key={index} entry={entry}/>
          )
      );
    })
    const articleEntries = entries.filter(entry => entry.isArticle).sort((a, b) => a.year > b.year ? 1 : -1)
    const bookEntries = entries.filter(entry => !entry.isArticle).sort((a, b) => a.year > b.year ? -1 : 1)

    return(
        loading ? <div>Loading publications...</div> :
            <div>
            <h3>Journal Articles</h3>
            {renderEntries(articleEntries)}
            <h3>Conference Papers</h3>
            {renderEntries(bookEntries)}
        </div>
    )
}

export default function PublicationsPage() {
    return (
        <CustomLayout title="Publications" description="Publications">
            <Box textAlign="center" style={{margin: 20}} className="responsive-wrapper">
                <h2>Publications</h2>
                <PublicationsList />
            </Box>
        </CustomLayout>
    );
}