// import DisplayBox from '../../../components/displaybox/DisplayBox';
import Longtext from '../../../components/longtext/Longtext';
import ModulesWrapper from '../../../components/module/ModulesWrapper';
import OwnedObjects from '../../../components/ownedobjects/OwnedObjects';
import TxForID from '../../../components/transactions-for-id/TxForID';
import { getOwnerStr, parseImageURL } from '../../../utils/objectUtils';
import { trimStdLibPrefix } from '../../../utils/stringUtils';
import { type DataType } from '../ObjectResultType';

import styles from './ObjectView.module.css';
function TokenView({ data }: { data: DataType }) {
    const viewedData = {
        ...data,
        objType: trimStdLibPrefix(data.objType),
        name: data.name,
        tx_digest: data.data.tx_digest,
        owner: getOwnerStr(data.owner),
        url: parseImageURL(data.data.contents),
    };

    const checkIsPropertyType = (value: any) =>
        ['number', 'string'].includes(typeof value);
    const stdLibRe = /0x2::/;
    const prepObjTypeValue = (typeString: string) =>
        typeString.replace(stdLibRe, '');

    const properties = Object.entries(viewedData.data?.contents)
        .filter(([key, _]) => key !== 'name')
        .filter(([_, value]) => checkIsPropertyType(value));

    const structProperties = Object.entries(viewedData.data?.contents)
        .filter(([_, value]) => typeof value == 'object')
        .filter(([key, _]) => key !== 'id');

    let structPropertiesDisplay: any[] = [];
    if (structProperties.length > 0) {
        structPropertiesDisplay = Object.values(structProperties).map(
            ([x, y]) => [x, JSON.stringify(y, null, 2)]
        );
    }
    /*
{viewedData.url !== '' && (
                <div className={styles.display}>
                    <DisplayBox display={viewedData.url} />
                </div>
            )}
*/
    return (
        <div>
            <h2 className={styles.header}>Description</h2>
            <table className={styles.description}>
                <tbody>
                    <tr>
                        <td>Type</td>
                        <td>{prepObjTypeValue(viewedData.objType)}</td>
                    </tr>

                    <tr>
                        <td>Object ID</td>
                        <td id="objectID" className={styles.objectid}>
                            <Longtext
                                text={viewedData.id}
                                category="objects"
                                isLink={false}
                                isCopyButton={false}
                            />
                        </td>
                    </tr>

                    {viewedData.tx_digest && (
                        <tr>
                            <td>Last Transaction ID</td>
                            <td>
                                <Longtext
                                    text={viewedData.tx_digest}
                                    category="transactions"
                                    isLink={true}
                                    isCopyButton={false}
                                />
                            </td>
                        </tr>
                    )}

                    <tr>
                        <td>Version</td>
                        <td>{viewedData.version}</td>
                    </tr>

                    <tr>
                        <td>Owner</td>
                        <td id="owner">
                            <Longtext
                                text={
                                    typeof viewedData.owner === 'string'
                                        ? viewedData.owner
                                        : typeof viewedData.owner
                                }
                                category="unknown"
                                isLink={
                                    viewedData.owner !== 'Immutable' &&
                                    viewedData.owner !== 'Shared'
                                }
                                isCopyButton={false}
                            />
                        </td>
                    </tr>
                    {viewedData.contract_id && (
                        <tr>
                            <td>Contract ID</td>
                            <td>
                                <Longtext
                                    text={viewedData.contract_id.bytes}
                                    category="objects"
                                    isLink={true}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {properties.length > 0 && (
                <>
                    <h2 className={styles.header}>Properties</h2>
                    <table className={styles.properties}>
                        <tbody>
                            {properties.map(([key, value], index) => (
                                <tr key={`property-${index}`}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            {structProperties.length > 0 && (
                <ModulesWrapper
                    data={{
                        title: '',
                        content: structPropertiesDisplay,
                    }}
                />
            )}
            <h2 className={styles.header}>Child Objects</h2>
            <OwnedObjects id={viewedData.id} byAddress={false} />
            <h2 className={styles.header}>Transactions </h2>
            <TxForID id={viewedData.id} category="object" />
        </div>
    );
}

export default TokenView;
