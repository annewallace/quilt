# Quilt is a data registry
Quilt provides versioned, reusable building blocks for analysis in the form of _data packages_. A data package may contain data of any type or size. In spirit, Quilt does for data what package managers and Docker registries do for code: provide a centralized, collaborative store of record.

## Benefits

* **Reproducibility** - Imagine source code without versions. Ouch. Why live with un-versioned data? Versioned data makes analysis reproducible by creating unambiguous references to potentially complex data dependencies.
* **Collaboration and transparency** - Data likes to be shared. Quilt offers a centralized data warehouse for finding and sharing data sets.
* **Auditing** - the data registry tracks all reads and writes so that admins know when data are accessed or changed
* **Less data prep** - Quilt abstracts away network, storage, and file format so that users can focus on what they wish to do with the data.
* **Deduplication** - Data fragments are hashed with `SHA256`. Duplicate data fragments are written to disk once globally per user. As a result, large, repeated data fragments consume less disk and network bandwidth.
* **Faster analysis** - Serialized data loads 5 to 20 times faster than files. Moreover, specialized storage formats like Apache Parquet minimize I/O bottlenecks so that tools like Presto DB and Hive run faster.


## Quick start
```
$ pip install quilt
$ quilt install uciml/iris
$ python
Python 3.6.3 | packaged by conda-forge | (default, Nov  4 2017, 10:13:32) 
[GCC 4.2.1 Compatible Apple LLVM 6.1.0 (clang-602.0.53)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from quilt.data.uciml import iris
>>> iris.tables.iris()
     sepal_length  sepal_width  petal_length  petal_width           class
0             5.1          3.5           1.4          0.2     Iris-setosa
1             4.9          3.0           1.4          0.2     Iris-setosa
2             4.7          3.2           1.3          0.2     Iris-setosa
3             4.6          3.1           1.5          0.2     Iris-setosa
4             5.0          3.6           1.4          0.2     Iris-setosa

```

## Demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/bKIV1GUVLPc" frameborder="0" allowfullscreen></iframe>
