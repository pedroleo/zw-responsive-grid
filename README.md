# zw-responsive-grid

Responsive HTML grid with a bit of css and almost none vanilla JS. No Jquery.

<p>A grid with a certain amount of columns can take up considerable space on mobile device screens. Thinking about this problem, I decided to create a solution where you can hide columns that are not so important, due to a better user experience.</p>

<p>Responsive grid solutions, such as the solution documented in W3 Schools, where the responsiveness of a table is given by a horizontal scroll implies several usability problems.</p>

<p>manipulating the display of elements in a table is the best option, but we fall into the initial problem of this article: From a certain number of columns, the space occupied can be crucial for a good user experience.</p>

<p>To work around this problem, the solution proposed here, in this document, foresees the identification of the primary key of a row in the table, and the possibility of expanding the columns that are not so important, initially hidden, when the user deems it necessary to display these columns.</p>

<p>You can choose any of these three options</p>
<ul>
<li><b>Hide all table columns</b>, saving space, but identifying on table header for mobile devices the keys of each line. To see all columns, user must expand the columns, clicking over this table header (created dinamically) </li>
<li><b>Fix some columns and hide others</b>, saving space, but keep columns that you consider important to be always visible, visible. In this case, the table header is followed by a column with the fixed data.</li>
<li><b>If your table is not huge, you can ignore the expand feature and show everything once. In this case the table header will not be created</b></li>
</ul>

<p>The magic is all done with two attributes inside the table header cells</p>
<dl>
    <dt>data-pk attribute :bool</dt>
    <dd>When a table header cell AKA &lt;th&gt; has data-pk="true" attribute, the text value of each table cell is used to create the table-header-mobile dinamically. If the table headers cells has at least one data-pk attribute as true, the table header mobile will be created.</dd>
    <dt>data-hide attribute :bool</dt>
    <dd>To hide columns, you have to add data-hide="true" inside the table header cell.</dd>
</dl>

<h2>Best practices</h2>
<p>Prefer fix the columns by the last one to the first. to prevent weird animations when expanding or hiding the content</p>
<p>Do not use data-pk attribute if you won`t hide any column</p>

Examples and documentations: http://zonaweb.com.br/rgrid
